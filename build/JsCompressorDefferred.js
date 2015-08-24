/**
 * @file jscompressor需要配置files，这里需要延迟设置files
 * 使用depTree筛选需要压缩的js
 * @author mengke01(kekee000@gmail.com)
 */

function Deferred(options) {
    AbstractProcessor.call(this, options);
}

Deferred.prototype = new AbstractProcessor();
Deferred.prototype.name = 'JsCompressorDeferred';
Deferred.prototype.start = function (processContext, callback) {
    var files = this.files || [];
    if (this.tree) {
        var depFiles = this.tree.getFiles(this.tree.getItems(function (res) {
            return res.changed
                && (res.type === 'js' || res.type === 'require');
        }));
        files = files.concat(depFiles);
    }

    if (files.length) {
        new JsCompressor({
            files: files
        }).start(processContext, callback);
    }
    else {
        callback();
    }
};


module.exports = exports = Deferred;
