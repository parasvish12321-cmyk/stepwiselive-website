const chokidar = require('chokidar');
const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// ----------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------
const DEBOUNCE_MS = 5000;

const IGNORE_PATTERNS = [
  /\.git[\/\\]/,
  /node_modules[\/\\]/,
  /dist[\/\\]/,
  /build[\/\\]/,
  /\.next[\/\\]/,
  /out[\/\\]/,
  /coverage[\/\\]/,
  /\.cache[\/\\]/,
  /\.tmp[\/\\]/,
  /logs[\/\\]/,
  /\.log$/,
  /\.env/, // matches .env, .env.local, .env.development.local, etc.
];

const SUSPICIOUS_PATTERNS = [
  /AIza[0-9A-Za-z-_]{35}/, // Google API Key
  /sk-[a-zA-Z0-9]{48}/,    // OpenAI API Key
  /secret/i,
  /password/i,
  /client_secret/i,
  /private_key/i,
  /mongodb\+srv:\/\/[^\s]+/,
  /postgres:\/\/[^\s]+/,
  /Authorization:\s*Bearer/i,
];

// ----------------------------------------------------------------------
// STATE
// ----------------------------------------------------------------------
let debounceTimer = null;
let isSyncing = false;
let changedFiles = new Set();

// ----------------------------------------------------------------------
// UTILS
// ----------------------------------------------------------------------
function log(msg) {
  console.log(`[StepWise Git Sync] ${msg}`);
}

function errorLog(msg) {
  console.error(`[StepWise Git Sync Error] ${msg}`);
}

function runCmd(command) {
  return execSync(command, { encoding: 'utf-8', stdio: 'pipe' }).trim();
}

// ----------------------------------------------------------------------
// CORE LOGIC
// ----------------------------------------------------------------------

function generateCommitMessage(files) {
  if (files.length === 0) return 'Update StepWise website';
  
  const fileNames = files.map(f => path.basename(f));
  
  if (fileNames.some(f => f.toLowerCase().includes('hero'))) return 'Update homepage UI';
  if (fileNames.some(f => f.toLowerCase().includes('predictor'))) return 'Update call predictor';
  if (fileNames.some(f => f.toLowerCase().includes('journey') || f.toLowerCase().includes('portaloverview'))) return 'Update StepWise journey section';
  if (fileNames.some(f => f.toLowerCase().includes('nav') || f.toLowerCase().includes('footer'))) return 'Update navigation/footer links';
  
  return `Update StepWise website (${fileNames.slice(0, 3).join(', ')}${fileNames.length > 3 ? '...' : ''})`;
}

function checkSecrets(stagedFiles) {
  for (const file of stagedFiles) {
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) continue;
    if (file.includes('git-auto-sync.js')) continue;
    
    // Check if it's a known non-text file
    if (file.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|mp4|webm|zip|tar|gz|pdf)$/i)) continue;

    try {
      const content = fs.readFileSync(file, 'utf-8');
      for (const pattern of SUSPICIOUS_PATTERNS) {
        if (pattern.test(content)) {
          return { file, pattern: pattern.toString() };
        }
      }
    } catch (err) {
      // Ignore read errors for binary or unreadable files
    }
  }
  return null;
}

async function performSync() {
  if (isSyncing) {
    log("A sync is already in progress. Skipping this trigger.");
    return;
  }

  isSyncing = true;
  log("Changes settled.");

  try {
    // 1. Check Git Status
    const status = runCmd('git status --porcelain');
    if (!status) {
      log("No changes detected by git. Skipping sync.");
      isSyncing = false;
      return;
    }

    // 2. Git Add
    log("Staging changes...");
    runCmd('git add -A');

    // 3. Inspect Staged Files
    const stagedStr = runCmd('git diff --cached --name-only');
    if (!stagedStr) {
      log("No files staged. Skipping sync.");
      isSyncing = false;
      return;
    }
    const stagedFiles = stagedStr.split('\n').filter(Boolean);

    // 4. Security Check
    log("Running security check...");
    const secretDetection = checkSecrets(stagedFiles);
    if (secretDetection) {
      errorLog(`Potential secret detected in: ${secretDetection.file}`);
      errorLog(`Pattern matched: ${secretDetection.pattern}`);
      errorLog(`Automatic Git sync paused. Please manually resolve the issue.`);
      runCmd('git reset'); // Unstage files
      isSyncing = false;
      return;
    }

    // 5. Build Validation
    // Check if 'build' script exists in package.json
    const pkgRaw = fs.readFileSync('package.json', 'utf-8');
    const pkg = JSON.parse(pkgRaw);
    if (pkg.scripts && pkg.scripts.build) {
      log("Running build validation (npm run build)...");
      try {
        // Use synchronous exec to block until build finishes
        execSync('npm run build', { stdio: 'inherit' });
        log("Build passed.");
      } catch (err) {
        errorLog("Build failed. GitHub push paused.");
        errorLog("Automatic Git sync paused until the build is fixed.");
        runCmd('git reset'); // Unstage files
        isSyncing = false;
        return;
      }
    }

    // 6. Commit
    const commitMessage = generateCommitMessage(stagedFiles);
    log(`Creating commit:\n"${commitMessage}"`);
    runCmd(`git commit -m "${commitMessage}"`);

    // 7. Push
    log("Pushing to GitHub...");
    try {
      runCmd('git push origin main');
      log("✓ GitHub updated successfully.");
    } catch (err) {
      errorLog("Commit created locally, but GitHub push failed.");
      errorLog("Reason: " + err.message);
      errorLog("Manual intervention required (check for conflicts, detached HEAD, or network issues).");
    }
  } catch (err) {
    errorLog("An error occurred during synchronization:");
    errorLog(err.message);
  } finally {
    changedFiles.clear();
    isSyncing = false;
  }
}

// ----------------------------------------------------------------------
// WATCHER SETUP
// ----------------------------------------------------------------------
function startWatcher() {
  log("Watching project files...");

  const watcher = chokidar.watch('.', {
    ignored: (pathStr) => {
      // Normalize path for cross-platform checking
      const normalizedPath = pathStr.replace(/\\/g, '/');
      return IGNORE_PATTERNS.some((pattern) => pattern.test(normalizedPath));
    },
    persistent: true,
    ignoreInitial: true,
  });

  watcher.on('all', (event, filePath) => {
    log(`Change detected: ${filePath}`);
    changedFiles.add(filePath);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    log("Waiting for changes to settle...");
    debounceTimer = setTimeout(() => {
      performSync();
    }, DEBOUNCE_MS);
  });
}

// Ensure working directory is clean or has valid state
try {
  const branch = runCmd('git branch --show-current');
  if (branch !== 'main') {
    errorLog(`Current branch is '${branch}', expected 'main'. Please switch to main before running auto-sync.`);
    process.exit(1);
  }
  
  // Start the watcher
  startWatcher();
} catch (err) {
  errorLog("Failed to initialize Git auto-sync. Ensure you are in a valid Git repository.");
  errorLog(err.message);
  process.exit(1);
}
