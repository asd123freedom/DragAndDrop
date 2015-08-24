    {strip}
        <div class="middle">
            <ul class="middle-nav">
                <li class="active">全部<div class="pointer"></div></li>
                <li>用户动态<div class="pointer"></div></li>
                <li>圈子文章<div class="pointer"></div></li>
                <li>求助贴<div class="pointer"></div></li>
            </ul>

        <!--     <div class="activity user-activity-wrap">
                <div class='type-tag tag-user'>用户动态</div>
                <div class="activity-head">
                    <div class="activity-info">
                        <span>阅读<i>({$tplData.userActivity.read})</i></span>
                        <span>赞<i>({$tplData.userActivity.appreciate})</i></span>
                    </div>
                    <div class="logo">
                        <img src="{$tplData.userActivity.logo}"></img>
                        <span>{$tplData.userActivity.name}</span>
                    </div>
                </div>
                <div class="activity-content">
                    <p>{$tplData.userActivity.content}</p>
                </div>
            </div>

            <div class="activity group-article-wrap">
                <div class='type-tag tag-article'>圈子文章</div>
                <div class="activity-head">
                    <div class="activity-info">
                        <span>阅读<i>({$tplData.groupArticle.read})</i></span>
                        <span>赞<i>({$tplData.groupArticle.appreciate})</i></span>
                    </div>
                    <div class="logo">
                        <img src="{$tplData.groupArticle.logo}"></img>
                        <span>{$tplData.groupArticle.name}</span>
                    </div>
                </div>
                <div class="activity-content">
                    <p>{$tplData.groupArticle.content}</p>
                </div>
            </div> -->

            {foreach $tplData.activity as $activity}
            {if $activity.type eq 'USER_ACTIVITY'}
            <div class="activity user-activity-wrap">
            {elseif $activity.type eq 'GROUP_ARTICLE'}
            <div class="activity group-article-wrap">
            {else}
            <div class="activity help-post-wrap">
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
            </div>
            {/foreach}

        </div>
    {/strip}