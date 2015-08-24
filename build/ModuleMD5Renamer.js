/**
 * @file 模块的md5替换，适用于旧的编译方式
 * @author mengke01(kekee000@gmail.com)
 */
var path = require('./edp-modules').edp.path;

var rqReg = /require\s*(\r\n)*\(\s*(\r\n)*\[([^\]]+)\]/g;
var mdRegStr = '(\'|")([^\'"]+)\\1';
var mdgReg = new RegExp(mdRegStr, 'g');
var mdiReg = new RegExp(mdRegStr, 'i');

var scriptTPLReg = /{include.*?common\/(script|script-simple).tpl[^}]*}/;

var bundlesTemplate = '{literal}'
    + '<script>require.config({bundles: bundlesMap});</script>'
    + '{/literal}';


function ModuleMD5Renamer(options) {
    this.files = ['*.tpl'];
    AbstractProcessor.call(this, options);
}

ModuleMD5Renamer.prototype = new AbstractProcessor();
ModuleMD5Renamer.prototype.name = 'ModuleMD5Renamer';

ModuleMD5Renamer.prototype.process = function (file, processContext, callback) {
    var renameMap = {};
    // 蹩脚的方式找到模板中的异步脚本
    var requireStr = file.data.match(rqReg);
    requireStr && requireStr.forEach(function (item) {
        var md5paths = [];
        var result = item.match(mdgReg);
        result && result.forEach(function (modulePath) {
            var resPath = modulePath.match(mdiReg)[2];
            var lookupFile = path.join('src', resPath) + '.js';

            // 查找源文件是否存在
            var lookupFileInfo = processContext.getFileByPath(lookupFile);
            if (lookupFileInfo) {
                // 生成md5名，不带后缀名
                var md5path = resPath + '-' + lookupFileInfo.md5sum(0, 8);
                md5paths.push('"' + md5path + '"');

                // 需要生成md5新文件
                if (!lookupFileInfo.get('md5renamed')) {

                    renameMap[md5path] = renameMap[md5path] || [];
                    renameMap[md5path].push(resPath);

                    lookupFileInfo.outputPaths.push(
                        path.join(
                            path.dirname(lookupFileInfo.outputPath),
                            path.basename(md5path)
                        ) + '.js'
                    );
                    lookupFileInfo.set('md5renamed', 1);
                }
            }
        });
    });


    var data = file.data.replace(scriptTPLReg, function (m) {
        return m + bundlesTemplate.replace('bundlesMap', function () {
            return JSON.stringify(renameMap);
        });
    });

    // 写回数据
    file.setData(data);

    callback();

};

