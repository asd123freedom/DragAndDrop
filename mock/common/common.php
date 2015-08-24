<?php
/**
 * @file 公共模块
 * @author mengke01(kekee000@gmail.com)
 */

date_default_timezone_set("PRC");
ini_set('error_reporting', E_ALL & ~E_NOTICE);
ini_set('display_errors', 'On');

define('ROOT_DIR', dirname(dirname(__FILE__)));

/**
 * 全局配置类
 */
class Conf {
    static $rootDir;
    static $scriptDir;

    static function init() {
        self::$rootDir = str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']);
        $scriptDir = str_replace('\\', '/', $_SERVER['SCRIPT_FILENAME']);
        self::$scriptDir = substr($scriptDir, 0, strrpos($scriptDir, '/'));
    }
}

Conf::init();

require_once(ROOT_DIR.'/common/Util.php');
require_once(ROOT_DIR.'/common/Service.php');



/*

Service 组件在每个页面里面的调用方法

$service = new Service(array(
    'tplPath' => 'zhuanti/index',
    // json文件数组配置，会依次读取json文件中的变量，然后塞到smarty的templateVars
    'json' => array(
        '../common/data/header.json',
        './data'
    ),

    // 或者采用hash数组配置，会把json对象赋值给`key`，然后塞到smarty的templateVars
    'json' => array(
        'header' => '../common/data/header.json',
        'data' => './data'
    ),

    // var 直接塞到smarty的全局变量中
    'var' => array(
        'tplData' => $tplData
    ),

    // tplData 直接塞到templateVars中的tplData变量
    'tplData' => array()

    // extData 直接塞到templateVars中的extData变量
    'extData' => array()

    // paramData 直接塞到templateVars中的paramData变量
    'paramData' => array()
));

$service->doService();

*/
