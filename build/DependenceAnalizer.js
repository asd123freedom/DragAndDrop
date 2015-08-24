/**
 * @file 编译依赖分析
 * @author mengke01(kekee000@gmail.com)
 */

var fs = require('fs');
var edpModules = require('./edp-modules');
var edp = edpModules.edp;
var Deferred = edpModules.Deferred;
var TplDependenceAnalizer = require('./TplDependenceAnalizer');
var CssDependenceAnalizer = require('./CssDependenceAnalizer');
var Tree = require('./DependenceTree');

function rewriteModuleConfig(path, destPath, modules){
    // 模块编译
    var moduleConfig = JSON.parse(fs.readFileSync(path));
    modules.forEach(function (module) {
        moduleConfig.combine[module.replace('src/', '').replace('.js', '')] = 1;
    });
    fs.writeFileSync(destPath, JSON.stringify(moduleConfig));
}


function DependenceAnalizer(options) {
    AbstractProcessor.call(this, options);
}

DependenceAnalizer.prototype = new AbstractProcessor();
DependenceAnalizer.prototype.name = 'DependenceAnalizer';

DependenceAnalizer.prototype.start = function (processContext, callback) {
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

    var ctlDepsTree = me.tree; // 依赖树组件

    function analizeTpl() {
        edp.log.info('Running TplDependenceAnalizer analize html');
        var deferred = new Deferred();
        var analizer = new TplDependenceAnalizer({
            files: me.files
        });

        analizer.start(processContext, function () {
            ctlDepsTree.set(analizer.depsTree);
            deferred.resolve();
        });
        return deferred.promise;
    }


    function compileCss() {
        edp.log.info('Running LessCompiler compile css');
        var deferred = new Deferred();
        new LessCompiler({
            files: ctlDepsTree.getFiles(ctlDepsTree.getLess())
        }).start(processContext, function () {
            deferred.resolve();
        });
        return deferred.promise;
    }

    function compileModule() {
        edp.log.info('Running ModuleCompiler compile module');

        var moduleFiles = ctlDepsTree.getFiles(ctlDepsTree.getJSModules());

        rewriteModuleConfig(me.configFile, me.configFile + '.tmp', moduleFiles);
        var deferred = new Deferred();
        new ModuleCompiler({
            configFile: me.configFile + '.tmp',
            files: moduleFiles
        }).start(processContext, function () {

            fs.unlinkSync(me.configFile + '.tmp');
            deferred.resolve();
        });

        return deferred.promise;
    }

    function analizeCss() {
        edp.log.info('Running CssDependenceAnalizer analize css');

        var deferred = new Deferred();
        var analizer = new CssDependenceAnalizer({
            files: ctlDepsTree.getFiles(ctlDepsTree.getCss())
        });
        analizer.start(processContext, function () {
            ctlDepsTree.merge('css', analizer.depsTree);
            deferred.resolve();
        });
        return deferred.promise;
    }

    analizeTpl()
        .done(compileCss)
        .done(compileModule)
        .done(analizeCss)
        .done(finishProcessAll);
};

DependenceAnalizer.prototype.afterAll = function (processContext) {
};

module.exports = exports = DependenceAnalizer;
