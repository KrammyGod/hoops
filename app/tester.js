import { spawn } from 'child_process';
import kill from 'tree-kill';

// Windows thinks they're funny and uses different cmd
const npm = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';

// Spawn our backend for testing
const api = spawn(npm, ['run', 'dev'], { detached: false });

// Exit code of our tester will be the exit code of this process
let exitCode = 0;
function killMe() {
    console.log('My job is done, I think I will die now...');
    process.kill(exitCode);
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
        // We use this dependency to resolve platform issues
        // For example, on windows, you have to use taskkill
        kill(api.pid, 'SIGKILL', killMe);
    });
});
