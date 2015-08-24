<?php
/**
 * @file 页面脚本集合
 * @author mengke01(kekee000@gmail.com)
 */

/**
 * 判断array是否关联数组
 *
 * @param  {Array} $array 数组
 * @return {boolean}
 */
function isAssoc(&$array) {
    if(is_array($array)) {
        return array_keys($array) !== range(0, count($array) - 1);
    }
    return false;
}


/**
 * 获取路径的后缀名 'xxx.js' => 'js'
 * @param  {string} $filePath 文件名
 * @return {string}  后缀名
 */
function getFileExt($filePath) {
    $extPath = str_replace('\\', '/', $filePath);
    if (false !== ($extPos = strrpos($extPath, '/'))) {
        $extPath = substr($extPath, $extPos + 1);
    }

    if (false !== ($extPos = strrpos($extPath, '.'))) {
        return substr($extPath, $extPos + 1);
    }

    return '';
}

/**
 * 读取远程json
 *
 * @param  {string} $remoteUrl 远程Url
 * @return {Object} JSON对象
 */
function readRemoteJson($remoteUrl) {
    $json = file_get_contents($remoteUrl);
    return json_decode($json, true);
}

/**
 * 解析json文件
 *
 * @param  {string} $filePath 文件路径
 * @param  {boolean} $isRelatedToMock 是否相对于mock根目录
 * @return {Object}           json对象
 */
function readJson($filePath, $isRelatedToMock = false) {

    $ext = getFileExt($filePath);

    if (empty($ext)) {
        $filePath = $filePath . '.json';
    }

    if ($isRelatedToMock) {
        $filePath = Conf::$rootDir. '/mock/' . $filePath;
    }
    else {
        $filePath = Conf::$scriptDir . '/' . $filePath;
    }

    $json = file_get_contents($filePath);
    return json_decode($json, true);
}
