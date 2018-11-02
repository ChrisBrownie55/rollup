// Dev Logo
exports.dev = 'development';

// Prod Logo
exports.prod = 'production';

// Current environment variable
exports.env = String(process.env.NODE_ENV).trim() || exports.dev;

// Whether it is a development environment
exports.isDev = exports.env === exports.dev;

// Whether it is a production environment
exports.isProd = exports.env === exports.prod;

// Make Dll
exports.enableDLL = process.argv.includes('--dll');

// Open Bundler Watch
exports.enableWatch = process.argv.includes('--watch');

// Open Bundler Analysis Report
exports.enableReport = process.argv.includes('--report');

// Open eslint
exports.enableEslint = process.argv.includes('--lint');

// Open gzip
exports.enableGzip = process.argv.includes('--gzip');

/* eslint no-console: 0*/

// Console Prints
exports.logger = {
    warn(...arg) {
        console.log('\u001b[33m@warn\u001b[39m', ...arg);
    },

    info(...arg) {
        console.log('\u001b[32m@info\u001b[39m', ...arg);
    },

    erro(...arg) {
        console.log('\u001b[31m@erro\u001b[39m', ...arg);
    },

    out(...arg) {
        console.log(...arg);
    }
};
