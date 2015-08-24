<?php
require_once('./common/common.php');

// 首屏数据
// $tplData = readJson('./data/index');

$service = new Service(array(
    'tplPath' => 'pic',
    // 'tplData' => $tplData['data'],
));
$service->doService();
