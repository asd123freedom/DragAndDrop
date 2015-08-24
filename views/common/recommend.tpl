    {strip}      
        <div class="right">

            <div class="recommend-friend">
                <h3 class="rec-head">推荐好友</h3>
                <ul class= "wrapper">
                    {foreach $tplData.recommend.friend as $friend}
                    <li class="item">
                        <img src="{$friend.img}">
                    </li>
                    {/foreach}
                </ul>
                <div class="decoration-line"></div>
            </div>
            <div class="recommend-group">
                <h3 class="rec-head">推荐圈子</h3>
                <ul>
                    {foreach $tplData.recommend.group as $group}
                    <li class="item">
                        <img src="{$group.img}">
                        <div class="group-tag"><label>{$group.name}</label></div>
                    </li>

                    {/foreach}
                </ul>
                <div class="decoration-line"></div>
            </div>
        </div>
    {/strip}        