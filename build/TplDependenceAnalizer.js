/**
 * @file tpl模板依赖分析
 * @author mengke01(kekee000@gmail.com)
 */
var edp = require('./edp-modules').edp;
var path = edp.path;
var Tree = require('./DependenceTree');

var analizer = {

    require: function (content, lookupPath, resolver) {
        var regRequire = /\brequire\s*\(\s*\[([^\]]+)\]/g;
        var resList = [];

        // 模块依赖
        while (regRequire.exec(content)) {
            RegExp.$1.split(',').forEach(function (m) {
                m = m.trim();
                var res = m.slice(1, m.length - 1).trim();
                if (resolver) {
                    var destRes = resolver(lookupPath, res);
                    if (false !== destRes) {
                        resList.push({
                            origin: res,
                            file: destRes,
                            type: 'require'
                        });
                    }
                }
                else {
                    resList.push({
                        file: res,
                        type: 'require'
                    });
                }
            });
        }

        return resList;
    },

    js: function (content, lookupPath, resolver) {
        var reg = /src=('|")(?!https?)([^'"]+)\.js(?:\1|\?)/g;
        var resList = [];

        // 模块依赖
        while (reg.exec(content)) {
            var res = RegExp.$2 + '.js';
            if (resolver) {
                var destRes = resolver(lookupPath, res);
                if (false !== destRes) {
                    resList.push({
                        origin: res,
                        file: destRes,
                        type: 'js'
                    });
                }
            }
            else {
                resList.push({
                    file: res,
                    type: 'js'
                });
            }
        }

        return resList;
    },

    css: function (content, lookupPath, resolver) {
        var reg = /href=('|")(?!https?)([^'"]+)\.(css|less|styl)(?:\1|\?)/g;
        var resList = [];

        // 模块依赖
        while (reg.exec(content)) {
            var res = RegExp.$2 + '\.' + RegExp.$3;
            if (resolver) {
                var destRes = resolver(lookupPath, res);
                if (false !== res) {
                    resList.push({
                        origin: res,
                        file: destRes,
                        type: 'css'
                    });
                }
            }
            else {
                resList.push({
                    file: res,
                    type: 'css'
                });
            }
        }

        return resList;
    }
};


// 将路径转换为相对路径
var defaultResolver = {
    require: function (lookup, resPath) {
        return 'src/' + resPath + '.js';
    },
    js: function (lookup, resPath) {
        return 'src' + resPath.replace('{$base_url}', '');
    },
    css: function (lookup, resPath) {
        return 'src' + resPath.replace('{$base_url}', '');
    }
};

var analizers = Object.keys(analizer);

function TplDependenceAnalizer(options) {
    options = edp.util.mix({
        resolver: defaultResolver
    }, options);
    AbstractProcessor.call(this, options);

    this.depsTree = this.depsTree || [];
}

TplDependenceAnalizer.prototype = new AbstractProcessor();
TplDependenceAnalizer.prototype.name = 'TplDependenceAnalizer';
TplDependenceAnalizer.prototype.process = function (file, processContext, callback) {

    var lookupPath = path.dirname(file.path);
    var content = file.data;
    var resList = [];
    for (var i = 0, name; name = analizers[i++];) {
        var res = analizer[name].call(this, content, lookupPath, this.resolver[name]);
        for (var j = res.length - 1; j >= 0; j--) {
            resList.push(res[j]);
        }
    }

    if (resList.length) {
        this.depsTree.push({
            file: file.path,
            type: 'html',
            deps: resList
        });
    }
    else {
        this.depsTree.push({
            file: file.path,
            type: 'html'
        });
    }
    callback && callback();
};

TplDependenceAnalizer.prototype.afterAll = function (processContext) {
    var baseDir = processContext.baseDir;
    var depsTree = this.depsTree;
    var cssDeps = [];
    depsTree.forEach(function (item) {
        if (item.deps) {
            item.deps.forEach(function (dep) {
                if (dep.type === 'css') {
                    cssDeps.push(dep);
                }
            });
        }
    });

    // 判断css依赖是否less或stylus
    cssDeps.forEach(function (treeNode) {
        var dotIndex = treeNode.file.lastIndexOf('.');
        var ext = treeNode.file.slice(dotIndex + 1);
        var fileName = treeNode.file.slice(0, dotIndex + 1);
        // css后缀不一定是css文件
        if (ext === 'css' && !processContext.files[treeNode.file]) {
            var hasCss = ['less', 'styl'].some(function (ext) {
                var newFile = fileName + ext;
                if (processContext.files[newFile]) {
                    treeNode.file = newFile;
                    return true;
                }
            });

            if (!hasCss) {
                treeNode.deleted = true;
                edp.log.warn('can\'t find css file:%s', treeNode.file);
            }
        }
    });

    // 移出不存在的资源
    new Tree(depsTree).removeItems();
};

module.exports = exports = TplDependenceAnalizer;
