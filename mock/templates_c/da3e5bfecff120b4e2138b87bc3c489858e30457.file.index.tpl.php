<?php /* Smarty version Smarty-3.1.13, created on 2015-07-26 23:02:58
         compiled from "/Users/liuchaofan/projects/Bing/views/index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:104637497455abb5786f7979-98098827%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'da3e5bfecff120b4e2138b87bc3c489858e30457' => 
    array (
      0 => '/Users/liuchaofan/projects/Bing/views/index.tpl',
      1 => 1437922974,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '104637497455abb5786f7979-98098827',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.13',
  'unifunc' => 'content_55abb578777031_10577924',
  'variables' => 
  array (
    'base_url' => 0,
    'tplData' => 0,
    'item' => 0,
    'img' => 0,
    'new_ajax_url' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_55abb578777031_10577924')) {function content_55abb578777031_10577924($_smarty_tpl) {?><!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>病友圈</title>
    <link href="http://jiankang.baidu.com/favicon.ico" rel="shortcut icon">
    <?php echo $_smarty_tpl->getSubTemplate ("./common/conf.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

    <link href="<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
/css/main.css" rel="stylesheet">
</head>

<body class="">
    <div class="header"><ul class="nav"><li class="<?php if ($_smarty_tpl->tpl_vars['tplData']->value['category']=='index'){?>active<?php }?>">首页</li><li class="<?php if ($_smarty_tpl->tpl_vars['tplData']->value['category']=='profile'){?>active<?php }?>">个人中心</li><li class="<?php if ($_smarty_tpl->tpl_vars['tplData']->value['category']=='group'){?>active<?php }?>">圈子</li><li class="<?php if ($_smarty_tpl->tpl_vars['tplData']->value['category']=='friend'){?>active<?php }?>">我的好友</li></ul><div class="logo">Bing<span>友<span></div></div><div class="left"><div class="user"><div class="img"><img src="http://placehold.it/74x74"></img></div><div class="info"><p>天宇技师</p><p>男，25岁</p><p>北京市，东城区</p></div></div><div class="notice"><ul><?php  $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['tplData']->value['user']['notice']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value){
$_smarty_tpl->tpl_vars['item']->_loop = true;
?><li data-value="<?php echo $_smarty_tpl->tpl_vars['item']->value['value'];?>
"><?php echo $_smarty_tpl->tpl_vars['item']->value['key'];?>
<span class="num"><?php echo $_smarty_tpl->tpl_vars['item']->value['value'];?>
</span></li><?php } ?></ul></div></div><div class="middle"><div class="middle-nav"><ul><li>全部</li><li>用户动态</li><li>圈子文章</li><li>求助贴</li><div class="pointer"></div></ul></div><?php  $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['tplData']->value['info']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value){
$_smarty_tpl->tpl_vars['item']->_loop = true;
?><div class="activity"><div class="activity-head"><div class="activity-info"><span>阅读<i>(<?php echo $_smarty_tpl->tpl_vars['item']->value['read'];?>
)</i></span><span>赞<i>(<?php echo $_smarty_tpl->tpl_vars['item']->value['appreciate'];?>
)</i></span></div><div class="logo"><img src="<?php echo $_smarty_tpl->tpl_vars['item']->value['logo'];?>
"></img><span><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</span></div></div><div class="activity-content"><p><?php echo $_smarty_tpl->tpl_vars['item']->value['content'];?>
</p></div><?php if (!empty($_smarty_tpl->tpl_vars['item']->value['img'])){?><div class="activity-img"><?php  $_smarty_tpl->tpl_vars['img'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['img']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['item']->value['img']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['img']->key => $_smarty_tpl->tpl_vars['img']->value){
$_smarty_tpl->tpl_vars['img']->_loop = true;
?><img src="<?php echo $_smarty_tpl->tpl_vars['img']->value;?>
"></img><?php } ?></div><?php }?></div><?php } ?></div><div class="right"><div class="recommend-friend"><h3>推荐好友</h3><div class="wrapper"><div class="item"><img src="http://placehold.it/50x50/E8117F/fff"></div><div class="item"><img src="http://placehold.it/50x50/E8117F/fff"/></div><div class="item"><img src="http://placehold.it/50x50/E8117F/fff"/></div><div class="item"><img src="http://placehold.it/50x50/E8117F/fff"/></div><div class="item"><img src="http://placehold.it/50x50/E8117F/fff"/></div><div class="item"><img src="http://placehold.it/50x50/E8117F/fff"/></div><div class="item"><img src="http://placehold.it/50x50/E8117F/fff"/></div><div class="item"><img src="http://placehold.it/50x50/E8117F/fff"/></div></div></div><div class="recommend-group"><h3>推荐圈子</h3><div class="item first"><img src="http://placehold.it/96x96/fff17F/fff"/></div><div class="item first"><img src="http://placehold.it/96x96/fff17F/fff"/></div><div class="item"><img src="http://placehold.it/96x96/fff17F/fff"/></div><div class="item"><img src="http://placehold.it/96x96/fff17F/fff"/></div><div class="item"><img src="http://placehold.it/96x96/fff17F/fff"/></div></div></div>
    <?php echo $_smarty_tpl->getSubTemplate ("./common/script.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

    <script>
        define('global/ajaxURL', "<?php echo $_smarty_tpl->tpl_vars['new_ajax_url']->value;?>
");
        define('global/pageInfo', <?php echo json_encode($_smarty_tpl->tpl_vars['tplData']->value);?>
);
        /*
        require(['main'], function(main) {
            main.init();
        });
        */
    </script>
</body>
</html>
<?php }} ?>