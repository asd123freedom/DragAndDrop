    {strip}
        <div class="left">
            {if $tplData.user.userid}
            <div class="user">
                <div class="img">
                    <img src="http://placehold.it/74x74"></img>
                </div>
                <div class="info">
                    <span>{$tplData.user.name}</span>
                    <p>
                        <span>{$tplData.user.sex}，</span>
                        <span>{$tplData.user.age}岁</span>
                    </p>
                    <span>{$tplData.user.home.province}，</span>
                    <span>{$tplData.user.home.city}</span>
                </div>
            </div>
            {else}
            <div class="login-wrap">
                <div class="img">
                    <img src="http://placehold.it/74x74">
                </div>
                请登录百度账号
            </div>
            {/if}
            <div class="notice">
                <ul>
                    {foreach $tplData.user.notice as $item}
                        <li data-value="{$item.value}" data-name="{$item.type}" data-url="{$item.url}">
                            <a class="notice-item" href="javascript:void(0);">
                                <span class="num">{$item.value}</span>
                                <span>{$item.key}</span>
                                
                            </a>
                        </li>
                    {/foreach}
                </ul>
            </div>
        </div>
    {/strip}