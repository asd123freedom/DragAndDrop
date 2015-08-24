    {strip}
        <div class="left">
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
            <div class="notice">
                <ul>
                    {foreach $tplData.user.notice as $item}
                        <li data-value="{$item.value}" data-name="{$item.type}" data-url="{$item.url}">{$item.key}<span class="num">{$item.value}</span></li>
                    {/foreach}
                </ul>
            </div>
        </div>
    {/strip}