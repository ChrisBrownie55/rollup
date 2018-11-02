const colorize = require('@writ/utils/src/colorize');
const extend = require('@writ/utils/src/extend');
const rollup = require('rollup');

const utils = require('./utils');
const DEFAULT = require('./default');

try {
    require.resolve('../.scaffrc');
    start();
} catch (error) {
    throw error;
}

// start
function start() {
    const scaffrc = require('../.scaffrc');
    const options = genConfig(scaffrc);
    logBanner();
    utils.enableWatch || utils.isDev ? watch(options) : build(options);
}


// print bundler info
function logBanner() {
    utils.logger.out(`> Bundler rollup(v${colorize`${'green'}${rollup.VERSION}`})`);
    utils.logger.out(`> BuiltAt ${new Date().toLocaleString()}\n`);
}

// 生成 config 
function genConfig(scaffrc) {
    const options = scaffrc.rollup;

    try {
        typeof options.input.file === 'string';
    } catch (error) {
        throw error;
    }

    if (!utils.enableWatch) {
        delete DEFAULT.watch;
        delete options.watch;
    }

    return extend(true, DEFAULT, options);
}

// 构建模式
async function build({ input, output }) {
    const bundle = await rollup.rollup(input);
    await bundle.generate(output);
    await bundle.write(output);
}

// 监听模式
async function watch({ input, output, watch }) {
    const watcher = rollup.watch({
        ...input,
        output,
        watch
    });
    const logger = utils.logger;

    watcher.on('event', event => {
        const { code, error, input, output } = event;
        switch (code) {
            case 'START': // 监听器正在启动（重启）
                logger.out(` compling start...`)
                break;
            case 'BUNDLE_START': // 构建单个文件束
                logger.out(`    input ${colorize`${'green'}${input}`}`);
                break;
            case 'BUNDLE_END': // 完成文件束构建
                logger.out(`   output ${colorize.green`${output.join(', ')}`}`);
                logger.out(` duration ${colorize.green`${event.duration}`}ms`);
                break;
            case 'END': // 完成所有文件束构建
                logger.out(` compling done.\n`);
                break;
            case 'ERROR': // 构建时遇到错误
            case 'FATAL': // 遇到无法修复的错误
                logger.out(colorize`${'red'}${error.stack}`);
                break;
            default: break;
        }
    });
}