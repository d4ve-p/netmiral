const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

// 1. Define the Backend Directory explicitly
// This ensures we know exactly where we are, regardless of where the script is called from
const backendDir = path.join(process.cwd(), 'fast-api');

// 2. Detect Windows
const isWin = os.platform() === 'win32';

// 3. Construct the ABSOLUTE path to the Python executable
// We use absolute paths to guarantee we find the venv, no matter the CWD.
const pythonPath = isWin 
    ? path.join(backendDir, '.venv', 'Scripts', 'python.exe') 
    : path.join(backendDir, '.venv', 'bin', 'python');

// 4. Define arguments
const args = ['-m', 'uvicorn', 'app.main:app', '--reload', '--host', '0.0.0.0'];

console.log(`[Backend] Detected OS: ${os.platform()}`);
console.log(`[Backend] Absolute Python Path: ${pythonPath}`);
console.log(`[Backend] Working Directory: ${backendDir}`);

// 5. Spawn the process WITHOUT a shell
// shell: false means we run the executable directly. This fixes the "/bin/sh" error.
const child = spawn(pythonPath, args, {
    cwd: backendDir,
    stdio: 'inherit', // Pipe output to console
    shell: false      // <--- CRITICAL FIX
});

child.on('error', (err) => {
    console.error('[Backend] Failed to start subprocess:', err);
    console.error('[Backend] Please verify that the virtual environment exists at the path above.');
});