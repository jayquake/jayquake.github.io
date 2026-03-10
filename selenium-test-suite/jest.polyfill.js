// Run before test framework so AccessFlow SDK sees fetch in all workers
globalThis.fetch = require('node-fetch');
