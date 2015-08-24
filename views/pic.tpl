<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>图片查看器</title>
    {assign var="base_url" value=$base_dir scope="global"}
    <link href="{$base_url}/css/pic.css" rel="stylesheet">
</head>

<body class="">
    {strip}
    <div id="box">
        <ul id="list">
            <li class="item">
              <span class="text">Visit</span>
            </li>
            <li class="item">
              <span class="text">My</span>
            </li>
            <li class="item">
              <span class="text">Website</span>
            </li>
            <li class="item">
              <span class="text">For</span>
            </li>
            <li class="item">
              <span class="text">More</span>
            </li>
            <li class="item">
              <span class="text">Info</span>
            </li>
            <li class="item">
              <span class="text">And</span>
            </li>
            <li class="item">
              <span class="text">Projects!</span>
            </li>
        </ul>
    </div>
    <div id="pic">
        {for $foo=1 to 30}
            <div>
                {$foo}
            </div>
        {/for}
    </div>
    <div id="small"></div>
    {/strip}
    {include file="./common/script.tpl"}
    <script src="{$base_url}/pic.js"></script>
    <script src="{$base_url}/right.js"></script>
    <script src="{$base_url}/rightToLeft.js"></script>
</body>
</html>
