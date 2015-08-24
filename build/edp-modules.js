/**
 * @file edp相关模块引用，调用全局edp模块
 * @author mengke01(kekee000@gmail.com)
 */

var GLOBAL_MODULE = process.mainModule.filename.slice(0, process.mainModule.filename.indexOf('node_modules') + 13);

module.exports = exports = {
    'GLOBAL_MODULE': GLOBAL_MODULE,
    'dots': (require( 'os' ).platform() === 'darwin') ? '⋅⋅⋅' : '...',
    'edp': require(GLOBAL_MODULE + 'edp-build/node_modules/edp-core'),
    'Deferred': require(GLOBAL_MODULE + 'edp-build/node_modules/edp-core/lib/base/Deferred')
};
