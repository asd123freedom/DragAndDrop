/**
 * @file 对分析树同之前的文件做diff，生成change列表
 * @author mengke01(kekee000@gmail.com)
 */

var fs = require('fs');
var edpModules = require('./edp-modules');
var edp = edpModules.edp;
var crypto = require('crypto');


/**
 * 生成md5校验码
 * @param  {Object} file edp file对象
 * @return {string}  md5校验码
 */
function getMd5(fileInfo) {
    if (!fileInfo.get('md5diff')) {
        var md5 = crypto.createHash('md5');
        md5.update(fileInfo.getDataBuffer());
        var hexStr = md5.digest('hex');
        fileInfo.set('md5diff', hexStr);
        return hexStr;
    }

    return fileInfo.get('md5diff');
}


function Differ(options) {
    AbstractProcessor.call(this, options);
}

Differ.prototype = new AbstractProcessor();
Differ.prototype.name = 'DependenceDiffer';

Differ.prototype.start = function (processContext, callback) {

    var dots = edpModules.dots;
    var me = this;
    var start = Date.now();
    this._beforeLog = '  (' + (Date.now() - start ) + 'ms) ' + dots + ' ';
    edp.log.write( this._beforeLog );


    function finishProcessAll() {
        me.afterAll(processContext);
        edp.log.write( '%s ' + dots + ' (%sms)', me.name + ' Process done', Date.now() - start );
        callback();
    }


    var lastBuildInfo = {};
    if (me.infoFile && fs.existsSync(me.infoFile)) {
        lastBuildInfo = JSON.parse(fs.readFileSync(me.infoFile));
    }

    function walkChanged(treeNode) {

        // 检查依赖节点是否改变
        if (treeNode.deps) {
            var changeCount = 0;
            treeNode.deps.forEach(function (depNode) {
                changeCount += walkChanged(depNode) ? 1 : 0;
            });
            treeNode.changed = changeCount > 0;
        }

        var lookupFile = processContext.getFileByPath(treeNode.file);

        // 检查自身是否改变
        if (lookupFile) {
            treeNode.md5 = getMd5(lookupFile);

            if (!treeNode.changed) {
                treeNode.changed = treeNode.md5 !== lastBuildInfo[treeNode.file];
            }

            // 标记文件改变，这里设置fileInfo，以便于后续进行替换的时候不用重新查找
            treeNode.fileInfo = lookupFile;
            if (treeNode.changed) {
                lookupFile.set('changed', 1);
            }
        }
        else {
            edp.log.warn('can\'t find dep file:%s:', treeNode.file);
            treeNode.deleted = true;
            treeNode.changed = false;
        }

        return treeNode.changed;
    }

    me.tree.get().forEach(walkChanged);

    // 保存当前的diff信息，以便于下次使用
    if (false !== this.saveInfo && this.infoFile) {
        fs.writeFileSync(this.infoFile, JSON.stringify(this.tree.getFileMap()));
    }

    finishProcessAll();
};

Differ.prototype.afterAll = function (processContext) {
};

module.exports = exports = Differ;
