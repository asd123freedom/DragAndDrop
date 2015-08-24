<?php /* Smarty version Smarty-3.1.13, created on 2015-08-03 10:05:30
         compiled from "/Users/liuchaofan/projects/Bing/views/common/conf.tpl" */ ?>
<?php /*%%SmartyHeaderCode:116526760155abb5787805a1-73558257%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '26d34762624bb7203d64bf1b16559e78a3f90254' => 
    array (
      0 => '/Users/liuchaofan/projects/Bing/views/common/conf.tpl',
      1 => 1438136511,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '116526760155abb5787805a1-73558257',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.13',
  'unifunc' => 'content_55abb5787aeda8_81986684',
  'variables' => 
  array (
    'health_host' => 0,
    'root' => 0,
    'base_dir' => 0,
    'base_url' => 0,
    'ASSET' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_55abb5787aeda8_81986684')) {function content_55abb5787aeda8_81986684($_smarty_tpl) {?><?php if (!empty($_smarty_tpl->tpl_vars['health_host']->value)){?><?php $_smarty_tpl->tpl_vars["ASSET"] = new Smarty_variable($_smarty_tpl->tpl_vars['health_host']->value, null, 0);?><?php }elseif(!empty($_smarty_tpl->tpl_vars['root']->value)){?><?php $_smarty_tpl->tpl_vars["ASSET"] = new Smarty_variable($_smarty_tpl->tpl_vars['root']->value, null, 0);?><?php }elseif(!empty($_smarty_tpl->tpl_vars['root']->value)){?><?php }elseif(!empty($_smarty_tpl->tpl_vars['base_dir']->value)){?><?php $_smarty_tpl->tpl_vars["ASSET"] = new Smarty_variable($_smarty_tpl->tpl_vars['base_dir']->value, null, 0);?><?php }else{ ?><?php $_smarty_tpl->tpl_vars["ASSET"] = new Smarty_variable($_smarty_tpl->tpl_vars['base_url']->value, null, 0);?><?php }?><?php $_smarty_tpl->tpl_vars["base_url"] = new Smarty_variable(((string)$_smarty_tpl->tpl_vars['ASSET']->value), null, 3);
$_ptr = $_smarty_tpl->parent; while ($_ptr != null) {$_ptr->tpl_vars["base_url"] = clone $_smarty_tpl->tpl_vars["base_url"]; $_ptr = $_ptr->parent; }
Smarty::$global_tpl_vars["base_url"] = clone $_smarty_tpl->tpl_vars["base_url"];?>
<?php }} ?>