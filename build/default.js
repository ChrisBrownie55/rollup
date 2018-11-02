module.exports = {
    input: {
        input: undefined, // 包的入口点  @CLI: -i/--input

        /**
         * @type [Function[String][Array]] 外链
         * 1. Function 需要一个 id 并返回 true 
         * 2. 外部依赖的名称
         * 3. 一个已被找到路径的ID（像文件的绝对路径）
         * @CLI:  -e/--external
         */
        external: undefined,
        plugins: [], // 插件对象 数组 Array (或一个插件对象) 要调用导入的插件函数(即 commonjs(), 而不是 commonjs)

        // 高级参数
        onwarn: function ({ loc, frame, code, message }) { }, // Function 将拦截警告信息, 默认 警告将被复制并打印到控制台
        cache: true,

        /**
         * 是否应用tree-shaking。建议您省略此选项（默认为treeshake：true），
         * 除非您发现由tree-shaking算法引起的bug，可以关闭此算法
         */
        treeshake: true,

        /**
         * @type [Object] 传递给Acorn的选项
         * @see https://www.npmjs.com/package/acorn 
         * Acorn是一个用JavaScript编写的小巧、快速的JavaScript解析器。
         */
        acorn: {},

        /**
         * 默认情况下，模块的上下文 - 即顶级的this的值为undefined。
         * 在极少数情况下，可能需要将其更改为其他内容，如 'window'。 
         */
        context: undefined,

        /**
         * @type [Object[Function]] 同context一样
         * 可以是每个模块可以是id: context对的对象
         * 也可以是id => context函数 
         */
        moduleContext: '',

        /**
         * @type [Boolean] 是否增加对诸如IE8之类的旧版环境的支持
         * 剥离更多可能无法正常工作的现代化的代码，其代价是偏离ES6模块环境所需的精确规范
         */
        legacy: false
    },
    output: {
        file: undefined,   // 若有bundle.write时必填   @CLI: -o/--output.file

        /**
         * @type [String]  生成包的格式 
         *  amd – 异步模块定义，用于像RequireJS这样的模块加载器
         *  cjs – CommonJS，适用于 Node 和 Browserify/Webpack
         *  es – 将软件包保存为ES模块文件
         *  iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
         *  umd – 通用模块定义，以amd，cjs 和 iife 为一体 
         * @CLI: -f/--output.format
         */
        format: 'cjs',
        name: '',   // 生成包名称, 变量名，代表 iife/umd 包，同一页上的其他脚本可以访问它 -n/--name

        /**
         * 全局模块
         * Object 形式的 id: name 键值对，用于umd/iife包
         * 
         * eg: 
         * globals: {
         *      jquery: '$'
         * }
         * 
         * @CLI -g/--globals
         */
        globals: {},

        /**
         * 路径: Function，它获取一个ID并返回一个路径，或者id：path对的Object
         * paths: {
         *    d3: 'https://d3js.org/d3.v4.min'
         * }
         */
        paths: {},
        banner: '', // 前置到文件束(bundle) 注释等
        footer: '', // 追加 到文件束(bundle) 注释等
        intro: '', // 内部任何特定格式的包装器(wrapper)
        outro: '', // 同intro

        /**
         * true: 将创建一个单独的sourcemap文件, 
         * inline:作为数据URI附加到生成的output文件中  
         * @CLI: -m/--sourcemap 
         */
        sourcemap: true,
        sourcemapFile: '', // 生成的包的sourcemap位置与名称 @CLI  -m/--sourcemap

        /**
         * @type [Boolean] 是否添加'interop块', 默认: true
         * @see https://www.rollupjs.com/guide/zh#-core-functionality-
         */
        interop: '',

        /**
         * @type [String] 使用什么导出模式, 默认: auto
         * 
         * default – 使用 export default ... 仅仅导出一个东西，那适合用这个
         * named – 如果你导出多个东西，适合用这个
         * none – 如果你不导出任何内容 (例如，你正在构建应用程序，而不是库)，则适合用这个
         */
        exports: 'auto',

        /**
         * @type [Object] 
         * 
         * amd.id String 用于 AMD/UMD 软件包的ID
         * amd.define String 要使用的函数名称
         * 
         * @CLI --amd.id and --amd.define
         */
        amd: {},

        /**
         * @type [String] 是要使用的缩进字符串，对于需要缩进代码的格式（amd，iife，umd）
         * 默认：true，自动缩减 false 无缩进 
         */
        indent: true,

        /**
         * @type [Boolean] true或false（默认为true） 
         * 是否在生成的非ES6软件包的顶部包含'use strict'pragma。
         * 严格来说，ES6模块始终都是严格模式 
         */
        strict: true
    },

    watch: {
        /**
         * @type [Boolean[Object]] 
         * Boolean 值表示应该使用 chokidar 而不是内置的 fs.watch，
         * 或者是一个传递给 chokidar 的选项对象。
         * 
         ** 希望使用它，必须单独安装 chokidar
         */
        chokidar: false,
        // 同 chokidar的 include 和 exclude
        include: 'src/**',
        exclude: 'node_modules/**',
    }
};