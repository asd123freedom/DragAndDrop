<?php
// timezone warning
date_default_timezone_set("PRC");

ini_set('error_reporting', E_ALL & ~E_NOTICE);
ini_set('display_errors', 'On');

define('root_dir', '../../src');
define('mock_dir', '../../mock/');
define('views_dir', '../../views/');

require('../libs/Smarty.class.php');

$smarty = new Smarty;
$smarty->assign('base_dir', root_dir);
$smarty->assign('health_host', root_dir);
$smarty->assign('root', root_dir);
$smarty->compile_dir = '../templates_c';
$smarty->template_dir = '../views';

$smarty->assign('headerPath', 'http://s1.bdstatic.com/r/www/cache/biz/ecom/onesite/20140509/site');

$smarty->assign("navList", array(
    // array(
    //     title=>'首页',
    //     current=>true
    // ),
    array(
        'title' => '首页',
        'current' => 1,
       // 'link' => 'http://www.baidu.com'
     ),
    array(
        'title' =>'医院',
        'link'=>'http://www.baidu.com'
    ),
    array(
        'title'=>'病症',
        'link'=>'http://www.baidu.com'
    ),
    array(
        'title' =>'医药馆',
        'link' =>'http://www.baidu.com'
    ),
    array(
        'title' =>"美容整形", 'hot' => 1,
        'link' =>"http://www.baidu.com"
    ),
    array(
        'title' =>"保健养生",
        'link' =>"http://www.baidu.com"
    ),
    array(
        'title' =>"专题",
        'link' =>"http://www.baidu.com"
    ),
    array(
        'title' =>"名医讲堂",
        'link' =>"http://www.baidu.com"
    ),
    array(
        'title' =>"社区",
        'link' =>"http://www.baidu.com"
    )
) );

$smarty->assign("loginData",
    array(
            'isLogin' => true,
            'userName' =>"特别特别长的名字试试看呀",
            'link' =>array(
                'baozhang' =>'http://www.baidu.com',
                'askDoctor' =>'question',
                'evaluate' =>'http://www.baidu.com',
                'acctSet' =>'http://www.baidu.com',
                'zhixin' =>'http://zhixin.baidu.com/my/index?module=onesite'
            ),
            'ajax' =>array(
                'guahao' => mock_dir.'/common/data/req/data.json',
                'askDoctorSummary' =>  mock_dir.'/common/data/req/askdoctor.json'
            )
        )
);

$smarty->assign("hFormData",array(
    "sessionID" => "15542137698075542136",
    "key"=>"男科医院",

    "provID" => "1",

    "provName" => "北京",

    "aType" => 4,

    "source" => 5,

    "action" => "/juhe/index"

));

$smarty->assign("extData", array(
    "subqid" => "1",
    "qid" => "1",
    "psid" => "1",
    "sid" => "1",
    "fr" => "1",
    "aType" => "1",
    "mpqid" => "1",
) );

$smarty->assign('paramData', array(
    'qid'=>123,
    'ssid'=>1
));

// 热搜词
$smarty -> assign( 'hotSearchWords', array(

    array (

        'word' => '男科医院',
        'link' => 'http://www.baidu.com'

    ),

    array (

        'word' => '男科医院',
        'link' => 'http://www.baidu.com'

    ),

    array (

        'word' => '男科医院',
        'link' => 'http://www.baidu.com'

    ),

    array (

        'word' => '男科医院',
        'link' => 'http://www.baidu.com'

    ),

    array (

        'word' => '男科医院',
        'link' => 'http://www.baidu.com'

    ),

    array (

        'word' => '男科医院',
        'link' => 'http://www.baidu.com'

    ),

    array (

        'word' => '男科医院',
        'link' => 'http://www.baidu.com'

    ),

    array (

        'word' => '男科医院',
        'link' => 'http://www.baidu.com'

    ),

    array (

        'word' => '男科医院',
        'link' => 'http://www.baidu.com'

    ),

    array (

        'word' => '男科医院',
        'link' => 'http://www.baidu.com'

    )

 ) );

//输出less引用
function echo_less() {
    //echo '<script src="'.mock_dir.'local/less-1.3.3.js"></script>';
}

?>
