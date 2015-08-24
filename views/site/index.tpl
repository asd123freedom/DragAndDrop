    {strip}    
    <div class="page">
        <!-- 导航栏 -->
        {include file='../common/navi.tpl'}    
        <!-- 左边栏 -->
        {include file='../common/left.tpl'}
        <!-- 搜索栏 -->
        <div class="mid-bar hide">
            <div class="search-box">
                <div class="search-input-wrap">
                    <input class="search-input">
                    <i class="iconfont">&#xe602;</i>
                </div>
            </div>
            <ul></ul>
        </div>
        <!-- 主页内容 -->
        <div class="middle">
            <ul class="middle-nav">
                <li class="active">全部<div class="pointer"></div></li>
                <li>用户动态<div class="pointer"></div></li>
                <li>圈子文章<div class="pointer"></div></li>
                <li>求助贴<div class="pointer"></div></li>
            </ul>
            <ul class="middle-content">
                {foreach $tplData.activity as $activity}
                {if $activity.type eq 'USER_ACTIVITY'}
                <li class="activity user-activity-wrap" data-type="{$activity.type}">
                {elseif $activity.type eq 'GROUP_ARTICLE'}
                <li class="activity group-article-wrap" data-type="{$activity.type}">
                {else}
                <li class="activity help-post-wrap" data-type="{$activity.type}">
                {/if}
                    <div class='type-tag'>{$activity.tag}</div>
                    <div class="activity-head">
                        <div class="activity-info">
                           <span>阅读<i>({$activity.read})</i></span>
                            <span>赞<i>({$activity.appreciate})</i></span>
                        </div>
                        {if !empty($activity.logo)}
                        <div class="logo">
                            <img src="{$activity.logo}"></img>
                            <span>{$activity.name}</span>
                        </div>
                        {else}
                        <span>{$activity.name}</span>
                        {/if}
                    </div>
                    <div class="activity-content">
                        <p>{$activity.content}</p>
                    </div>
                    {if !empty($activity.img)}
                    <div class="activity-img">
                        {foreach $activity.img as $img}
                        <img src="{$img}"></img>
                        {/foreach}
                    </div>
                    {/if}
            </li>
            {/foreach}
        </ul>

        </div>

        <!-- 右侧推荐栏 -->
        {include file='../common/recommend.tpl'}
        <div class="text-details hide"></div>
    </div>
    {/strip}

    {include file="../common/script.tpl"}
    <script>
        define('global/pageInfo', {$tplData|@json_encode});
        require(['main']);
    </script>
