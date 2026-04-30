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
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const isCI = process.env.CI === 'true';

  // In Docker/production the server is already running — just verify it's reachable
  try {
    await waitForServer(baseUrl, 5000);
    console.log(`Server already running at ${baseUrl}`);
    return;
  } catch {
    // Server not running, start it (local dev / CI)
  }

  if (isCI || process.env.NODE_ENV === 'production') {
    throw new Error(`Server not reachable at ${baseUrl} — expected it to be running already`);
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

  await waitForServer(baseUrl, 60000);
  console.log('Application server is ready');
};
