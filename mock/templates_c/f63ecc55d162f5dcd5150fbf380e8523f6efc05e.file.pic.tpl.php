<?php /* Smarty version Smarty-3.1.13, created on 2015-08-13 10:58:19
         compiled from "/Users/liuchaofan/projects/Bing/views/pic.tpl" */ ?>
<?php /*%%SmartyHeaderCode:75870062055c88ba9229c71-25663113%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'f63ecc55d162f5dcd5150fbf380e8523f6efc05e' => 
    array (
      0 => '/Users/liuchaofan/projects/Bing/views/pic.tpl',
      1 => 1439434694,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '75870062055c88ba9229c71-25663113',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.13',
  'unifunc' => 'content_55c88ba9295231_11958211',
  'variables' => 
  array (
    'base_dir' => 0,
    'base_url' => 0,
    'foo' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_55c88ba9295231_11958211')) {function content_55c88ba9295231_11958211($_smarty_tpl) {?><!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>图片查看器</title>
    <?php $_smarty_tpl->tpl_vars["base_url"] = new Smarty_variable($_smarty_tpl->tpl_vars['base_dir']->value, null, 3);
$_ptr = $_smarty_tpl->parent; while ($_ptr != null) {$_ptr->tpl_vars["base_url"] = clone $_smarty_tpl->tpl_vars["base_url"]; $_ptr = $_ptr->parent; }
Smarty::$global_tpl_vars["base_url"] = clone $_smarty_tpl->tpl_vars["base_url"];?>
    <link href="<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
/css/pic.css" rel="stylesheet">
</head>

<body class="">
    <div id="box"><ul id="list"><li class="item"><span class="text">Visit</span></li><li class="item"><span class="text">My</span></li><li class="item"><span class="text">Website</span></li><li class="item"><span class="text">For</span></li><li class="item"><span class="text">More</span></li><li class="item"><span class="text">Info</span></li><li class="item"><span class="text">And</span></li><li class="item"><span class="text">Projects!</span></li></ul></div><div id="pic"><?php $_smarty_tpl->tpl_vars['foo'] = new Smarty_Variable;$_smarty_tpl->tpl_vars['foo']->step = 1;$_smarty_tpl->tpl_vars['foo']->total = (int)ceil(($_smarty_tpl->tpl_vars['foo']->step > 0 ? 30+1 - (1) : 1-(30)+1)/abs($_smarty_tpl->tpl_vars['foo']->step));
if ($_smarty_tpl->tpl_vars['foo']->total > 0){
for ($_smarty_tpl->tpl_vars['foo']->value = 1, $_smarty_tpl->tpl_vars['foo']->iteration = 1;$_smarty_tpl->tpl_vars['foo']->iteration <= $_smarty_tpl->tpl_vars['foo']->total;$_smarty_tpl->tpl_vars['foo']->value += $_smarty_tpl->tpl_vars['foo']->step, $_smarty_tpl->tpl_vars['foo']->iteration++){
$_smarty_tpl->tpl_vars['foo']->first = $_smarty_tpl->tpl_vars['foo']->iteration == 1;$_smarty_tpl->tpl_vars['foo']->last = $_smarty_tpl->tpl_vars['foo']->iteration == $_smarty_tpl->tpl_vars['foo']->total;?><div><?php echo $_smarty_tpl->tpl_vars['foo']->value;?>
</div><?php }} ?></div><div id="small"></div>
    <?php echo $_smarty_tpl->getSubTemplate ("./common/script.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

    <script src="<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
/pic.js"></script>
    <!-- script src="<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
/right.js"></script-->
    <!-- script src="<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
/rightToLeft.js"></script-->
</body>
</html>
<?php }} ?>