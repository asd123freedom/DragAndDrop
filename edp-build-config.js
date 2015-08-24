var path = require('./build/edp-modules').edp.path;

exports.input = __dirname;
exports.output = path.resolve(__dirname, 'output');

/**
 * 根据`module.conf`生成所有入口js文件
 *
 * @inner
 */
function getModuleFiles() {
    var text = require('fs').readFileSync('./module.conf');
    var config = JSON.parse(text);

    var combineFiles = Object.keys(config.combine).map(function (key) {
        var file = key;
        return config.baseUrl + '/' + file + '.js';
    });

    var result = ['src/**/main.js'];
    combineFiles.forEach(function (item) {
        if (!/\/main\.js$/.test(item)) {
            result.push(item);
        }
    });
    return result;
}


var lessFiles = ['src/css/main.less'];
var moduleFiles = getModuleFiles();

exports.getProcessors = function () {

    var RemoveEtplComment = require('./build/RemoveEtplComment');
    var ModuleMD5Renamer = require('./build/ModuleMD5Renamer');
    var edp = require('./build/edp-modules').edp;

    return [
        new LessCompiler({
            // 自动替换less后缀名
            entryFiles: ['views/**/*.tpl'],
            files: lessFiles
        }),

        new RemoveEtplComment({
            files: ['*.hjs', '*.etpl'],
        }),

        new Html2JsCompiler({
            mode: 'compress',
            files: ['*.hjs', '*.svg', '*.etpl'],
            extnames: ['hjs', 'svg', 'etpl'],
            combine: true
        }),

        new ModuleCompiler({
            configFile: './module.conf',
            files: moduleFiles
        }),

        new CssCompressor({
            files: ['src/**/*.css'].concat(lessFiles),
            compressOptions: {
                keepBreaks: false
            }
        }),

        new MD5Renamer({
            resolve: function (lookupPath, resPath) {
                resPath = resPath.trim();
                // vml 和data-uri
                if (resPath === '' || resPath === '#default#VML' || resPath.indexOf('data:') === 0) {
                    return false;
                }
                return  path.join(lookupPath, resPath);
            },
            replacements: {
                css: {
                    files: lessFiles
                }
            }
        }),

        new MD5Renamer({
            resolve: function (lookupPath, resPath) {
                resPath = resPath.trim();
                var lookupFile;
                var htmlReg = /(\{\$base_url\})/g;
                // 路径中有base_url的，是tpl中引用的资源
                if (htmlReg.test(resPath)) {
                    lookupFile = resPath.replace(htmlReg, 'src');
                }
                // 否则是css中的url路径
                else {
                    lookupFile = path.join(lookupPath, resPath);
                }
                return lookupFile;
            },
            replacements: {
                // 处理tags里面的定义
                html: {
                    tags: [
                        {tag: 'link', attribute: 'href'},
                        {tag: 'script', attribute: 'src'}
                    ],
                    files: ['*.tpl']
                }
            }
        }),

        new JsCompressor({
            files: moduleFiles
        }),

        new Html2JsCompiler({
            files: ['*.hjs', '*.svg', '*.etpl'],
            extnames: ['hjs', 'svg', 'etpl'],
            clean: true
        })
    ];
};

exports.exclude = [
    '.svn',
    '.idea',
    '*.conf',
    '*.sh',
    '*.bat',
    '*.md',
    'doc',
    'agent',
    'mock',
    'test',
    'edp-*',
    'path.js',
    'simple-build-config.js',
    'ModuleMD5Renamer.js',
    'output',
    'build',
    '.DS_Store',
    '*.py',
    'issue.info'
];

exports.injectProcessor = function (processors) {
    for (var key in processors) {
        global[key] = processors[key];
    }
};
