/**
 * @file 去除etpl里面的注释
 * @author mengke01(kekee000@gmail.com)
 */


function RemoveEtplComment(options) {
    AbstractProcessor.call(this, options);
}

RemoveEtplComment.prototype = new AbstractProcessor();
RemoveEtplComment.prototype.name = 'RemoveTplComment';


// 去除etpl注释
var commandSyntax = /^\s*\/?(?:[a-z]+)\s*(?::([\s\S]*))?$/;

RemoveEtplComment.prototype.process = function (file, processContext, callback) {
    var changed = 0;
    var text = file.data.replace(/<!--([\s\S]*?)-->/g, function ($0, $1) {
        if (!commandSyntax.test($1)) {
            changed++;
            return '';
        }
        return $0;
    });

    if (changed) {
        file.setData(text);
    }

    callback();
};

module.exports = exports = RemoveEtplComment;
