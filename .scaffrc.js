module.exports = {
    rollup: {
        input: {
            input: 'src/es/main.js'
        },
        output: {
            file: 'dist/foo.es.js',
            format: 'cjs'
        }
    }
};