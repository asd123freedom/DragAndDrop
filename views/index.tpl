<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>病友圈</title>
    <link href="http://jiankang.baidu.com/favicon.ico" rel="shortcut icon">
    {assign var="base_url" value=$base_dir}
   {* {include file="./common/conf.tpl"} *}   
    <link href="{$base_url}/css/main.less" rel="stylesheet">
</head>

<body>
    {strip}
    <div class="page">
        <div class="header">
            <ul class="nav">
                <li class="{if $tplData.category eq 'index'}active{/if}">首页</li>
                <li class="{if $tplData.category eq 'profile'}active{/if}">个人中心</li>
                <li class="{if $tplData.category eq 'group'}active{/if}">圈子</li>
                <li class="{if $tplData.category eq 'friend'}active{/if}">我的好友</li>
            </ul>
            <div class="logo"><span>Bing友</span></div>
        </div>
        {include file='./left.tpl'}
        <div class="mid-bar hide">
            <div class="search-box">
                <div class="search-input-wrap">
                    <input class="search-input">
                    <i class="iconfont">&#xe602</i>
                </div>
            </div>
            <ul></ul>
        </div>

        {include file='./main.tpl'}


        {include file='./recommend.tpl'}
    </div>
    {/strip}
    {include file="./common/script.tpl"}
    <script>
        define('global/ajaxURL', "{$new_ajax_url}");
        define('global/pageInfo', {$tplData|@json_encode});
        require(['main']);
        /*
        require(['main'], function(main) {ldelim}
            main.init();
        {rdelim});
        */
    </script>
</body>
</html>
