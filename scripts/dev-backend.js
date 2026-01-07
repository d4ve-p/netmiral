const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

const backendDir = path.join(process.cwd(), 'fast-api');

const isWin = os.platform() === 'win32';

const venvBinDir = isWin 
    ? path.join(backendDir, '.venv', 'Scripts')
    : path.join(backendDir, '.venv', 'bin');

const pythonPath = path.join(venvBinDir, isWin ? 'python.exe' : 'python');

// 5. Define arguments
const args = ['-m', 'uvicorn', 'app.main:app', '--reload', '--host', '0.0.0.0'];

console.log(`[Backend] Detected OS: ${os.platform()}`);
console.log(`[Backend] Python Path: ${pythonPath}`);

const newEnv = { ...process.env };

newEnv.VIRTUAL_ENV = path.join(backendDir, '.venv');

newEnv.PATH = venvBinDir + path.delimiter + (process.env.PATH || '');

delete newEnv.PYTHONHOME;

const child = spawn(pythonPath, args, {
    cwd: backendDir,
    stdio: 'inherit',
    shell: false, 
    env: newEnv
});

child.on('error', (err) => {
    console.error('[Backend] Failed to start subprocess:', err);
    console.error('[Backend] Please verify that the virtual environment exists at the path above.');
});