/**
 * @file 进行清理工作，仅保留reserves和changed的文件
 * @author mengke01(kekee000@gmail.com)
 */
var edpModules = require('./edp-modules');
var edp = require('./edp-modules').edp;

/**
 * Output内容的清理处理器
 *
 * @constructor
 * @param {Object} options
 */
function Cleaner( options ){
    options = edp.util.mix({
        reserves: []
    }, options );
    AbstractProcessor.call( this, options );
}
Cleaner.prototype = new AbstractProcessor();

/**
 * @type {string}
 */
Cleaner.prototype.name = 'Cleaner';

Cleaner.prototype.start = function (processContext, callback) {
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

    var files = processContext.getFilesByPatterns(this.reserves);
    var fileMap = {};
    files.forEach(function (file) {
        fileMap[file.path] = true;
    });

    processContext.getFiles().forEach(function (file) {
        if (file.get('changed') || fileMap[file.path]) {
            edp.log.write('output file: %s ', file.outputPath);
        }
        else {
            processContext.removeFile(file.path);
        }
    });

    finishProcessAll();
};

module.exports = exports = Cleaner;
