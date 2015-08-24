/**
 * @file tpl模板依赖分析
 * @author mengke01(kekee000@gmail.com)
 */
var edp = require('./edp-modules').edp;
var path = edp.path;
var fs = require('fs');

var analizer = {

    pic: function (content, lookupPath, resolver) {
        var reg = /url\s*\(('|")?(?!https?|data:|#default#VML)([^'")]+)\1\)/g;
        var resList = [];

        // 模块依赖
        while (reg.exec(content)) {
            var res = RegExp.$2.trim();
            if (resolver) {
                var destRes = resolver(lookupPath, res);
                if (false !== res) {
                    resList.push({
                        origin: res,
                        file: destRes,
                        type: 'pic'
                    });
                }
            }
            else {
                resList.push({
                    file: res,
                    type: 'pic'
                });
            }
        }

        return resList;
    }
};


// 将路径转换为相对路径
var defaultResolver = {
    pic: function (lookup, resPath) {
        return path.join(lookup, resPath);
    }
};

var analizers = Object.keys(analizer);


function CssDependenceAnalizer(options) {
    options = edp.util.mix({
        resolver: defaultResolver
    }, options);
    AbstractProcessor.call(this, options);

    this.depsTree = this.depsTree || [];
}

CssDependenceAnalizer.prototype = new AbstractProcessor();
CssDependenceAnalizer.prototype.name = 'CssDependenceAnalizer';
CssDependenceAnalizer.prototype.process = function (file, processContext, callback) {

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
            deps: resList
        });
    }
    callback && callback();
};


module.exports = exports = CssDependenceAnalizer;
