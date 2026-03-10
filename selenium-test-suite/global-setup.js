const { exec } = require('child_process');
const http = require('http');

let serverProcess;

function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http
        .get(url, (res) => {
          if (res.statusCode === 200) {
            resolve();
          } else {
            retry();
          }
        })
        .on('error', retry);
    };

    const retry = () => {
      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Server at ${url} did not start within ${timeoutMs}ms`));
        return;
      }
      setTimeout(check, 1000);
    };

    check();
  });
}

module.exports = async function globalSetup() {
  const isCI = process.env.CI === 'true';

  if (!isCI) {
    try {
      await waitForServer('http://localhost:3000', 3000);
      console.log('Dev server already running on port 3000');
      return;
    } catch {
      // Server not running, start it
    }
  }

  console.log('Starting application server...');
  serverProcess = exec('npm start', {
    cwd: process.cwd().includes('selenium-test-suite')
      ? require('path').resolve(process.cwd(), '..')
      : process.cwd(),
    env: { ...process.env, BROWSER: 'none' },
  });

  serverProcess.stdout?.on('data', (data) => {
    if (process.env.DEBUG) console.log('[server]', data.toString().trim());
  });
  serverProcess.stderr?.on('data', (data) => {
    if (process.env.DEBUG) console.error('[server]', data.toString().trim());
  });

  global.__SERVER_PROCESS__ = serverProcess;

  await waitForServer('http://localhost:3000', 60000);
  console.log('Application server is ready');
};
