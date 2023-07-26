import { exec, spawn } from 'child_process';

// Windows thinks they're funny and uses different cmd
const win = /^win/.test(process.platform);
const npm = win ? 'npm.cmd' : 'npm'

// Spawn our backend for testing
const api = spawn(npm, ['run', 'dev'], { detached: false });
api.stdout.pipe(process.stdout);
api.stderr.pipe(process.stderr);

// Exit code of our tester will be the exit code of this process
let exitCode = 0;
function killMe() {
    console.log('My job is done, I think I will die now...');
    process.kill(exitCode);
}

const kill = (child, callback) => {
    if (win) {
        return exec(`taskkill /pid ${child.pid} /T /F`, callback);
    }
    child.once('close', callback)
    child.once('exit', callback)
    child.kill('SIGKILL');
}

api.once('spawn', () => {
    // API is now ready, spawn our tests & get output
    const child = spawn(npm, ['run', 'jest']);
    // Jest only outputs to error
    child.stderr.pipe(process.stderr);

    // Test is completed
    child.once('close', (code) => {
        console.log(`Test Completed with code ${code}`);
        exitCode = code ?? 0;
        // Call our self kill
        kill(api, killMe);
    });
});
