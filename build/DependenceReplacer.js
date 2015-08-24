/**
 * @file 对分析树同之前的文件做diff，生成change列表
 * @author mengke01(kekee000@gmail.com)
 */

var fs = require('fs');
var edpModules = require('./edp-modules');
var edp = edpModules.edp;

function getPattern(str) {
    return str.replace(/[*.?+$^\[\](){}|\\/]/g, function ($0) {
        return '\\' + $0;
    });
}

function replaceFileName(refPath, fileInfo, renamer) {
    if (fileInfo) {
        var md5sum;
        if (!fileInfo.get('md5renamed')) {
            var md5sum = fileInfo.md5sum();
            var md5path = renamer(fileInfo.outputPath, md5sum);
            fileInfo.outputPaths.push(
                edp.path.join(
                    edp.path.dirname(fileInfo.outputPath),
                    edp.path.basename(md5path)
                )
            );
            fileInfo.set('md5renamed', md5path);
        }
        else {
            md5sum = fileInfo.md5sum();
        }
        return renamer(refPath, md5sum);
    }
    else {
        edp.log.warn('no dep file found:', refPath);
        return refPath;
    }
}

function processReplaceDeps(treeNode, deps, processContext, renamer) {
    deps.forEach(function (dep) {
        var reg = new RegExp(getPattern(dep.origin));
        treeNode.fileInfo.data = treeNode.fileInfo.data.replace(reg, function ($0) {
            return replaceFileName($0, dep.fileInfo, renamer);
        });
    });
}

function processReplaceRequire(treeNode, deps, processContext, renamer, bundlesReplacer) {
    if (!deps.length) {
        return;
    }

    var bundlesMap = {};
    deps.forEach(function (dep) {
        var fileName = replaceFileName(dep.origin, dep.fileInfo, renamer);
        bundlesMap[fileName] = [dep.origin];
    });
    treeNode.fileInfo.data = bundlesReplacer(treeNode.fileInfo.data, bundlesMap);
}

/**
 * 替换文件名
 * @param  {Object} treeNode       依赖树节点
 * @param  {Object} processContext 执行上下文
 */
function processReplace(treeNode, processContext, config) {

    if (treeNode.type === 'css') {
        processReplaceDeps(treeNode, treeNode.deps, processContext, config.renamer);
    }
    else if (treeNode.type === 'html') {
        processReplaceDeps(treeNode, treeNode.deps.filter(function (dep) {
            return dep.type === 'js' || dep.type === 'css'
        }), processContext, config.renamer);

        processReplaceRequire(treeNode, treeNode.deps.filter(function (dep) {
            return dep.type === 'require'
        }), processContext, config.renamer, config.bundlesReplacer);
    }
}

function defaultRenamer(template, origin, md5sum) {
    var slashIndex = origin.lastIndexOf('/');
    var dotIndex = origin.lastIndexOf('.');

    // 判断是否出现`/xxx/xx.x/xxx`的情况
    if (slashIndex >= dotIndex) {
        dotIndex = -1;
    }
    var dataHash = {
        basename: origin.slice(0, dotIndex === -1 ? origin.length : dotIndex),
        extname: dotIndex === -1 ? '' : origin.slice(dotIndex),
        md5sum: md5sum.slice(0, 8)
    };

    var name = template.replace(/\{([^}]+)\}/g, function($0, $1){
        return dataHash[$1] || '';
    });

    return name;
}


function defaultBundlesReplacer(fileContent, bundles) {
    var scriptTPLReg = /file=("|')[.\/]*common\/script(?:-simple)?\.tpl\1\}/;
    return fileContent.replace(scriptTPLReg, function (m) {
        return m
            + '{literal}'
            + '<script>require.config({bundles: '
            + JSON.stringify(bundles)
            + '});</script>'
            + '{/literal}';
    });
}

function Replacer(options) {

    options = edp.util.mix({
        replacements: {
            template: '{basename}-{md5sum}{extname}', // 重命名模板
            renamer: defaultRenamer, // 重命名函数
            bundlesReplacer: defaultBundlesReplacer // require映射函数
        }
    }, options);

    AbstractProcessor.call(this, options);

    // 生成重命名函数
    var originRenamer = this.replacements.renamer;
    var template = this.replacements.template;
    this.replacements.renamer = function (origin, md5sum) {
        return originRenamer(template, origin, md5sum);
    };
}

Replacer.prototype = new AbstractProcessor();
Replacer.prototype.name = 'DependenceReplacer';

Replacer.prototype.start = function (processContext, callback) {

    var dots = edpModules.dots;
    var me = this;
    var start = Date.now();
    this._beforeLog = '  (' + (Date.now() - start ) + 'ms) ' + dots + ' ';
    edp.log.write( this._beforeLog );

    function finishProcessAll() {
        me.afterAll( processContext );
        edp.log.write( '%s ' + dots + ' (%sms)', me.name + ' Process done', Date.now() - start );
        callback();
    }

    // 递归进行标记替换
    function walkMarkReplace(treeNode) {
        // 检查依赖节点是否改变
        if (treeNode.deps) {
            treeNode.needReplace = true;
            treeNode.deps.forEach(walkMarkReplace);
        }
    }

    me.tree.get().forEach(function (treeNode) {
        if (treeNode.changed) {
            walkMarkReplace(treeNode);
        }
    });


    // 递归进行文件替换
    function walkReplace(treeNode) {
        // 检查依赖节点是否改变
        if (treeNode.needReplace) {
            treeNode.deps.forEach(walkReplace);
            // 对需要替换的文件进行替换
            if (treeNode.fileInfo && !treeNode.fileInfo.get('md5replaced')) {
                processReplace(treeNode, processContext, me.replacements);
                treeNode.fileInfo.set('md5replaced', true);
            }
        }
    }

    me.tree.get().forEach(walkReplace);

    finishProcessAll();
};

Replacer.prototype.afterAll = function (processContext) {
};

module.exports = exports = Replacer;
