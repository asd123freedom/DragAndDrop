<?php /* Smarty version Smarty-3.1.13, created on 2015-08-19 20:28:39
         compiled from "/Users/liuchaofan/projects/RIA/views/common/script.tpl" */ ?>
<?php /*%%SmartyHeaderCode:171297280555d47677e668d4-17540021%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '675c5c608bbf3d6489e3b8e967b569010b1fbe8a' => 
    array (
      0 => '/Users/liuchaofan/projects/RIA/views/common/script.tpl',
      1 => 1439521971,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '171297280555d47677e668d4-17540021',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'base_url' => 0,
    'extData' => 0,
    'paramData' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.13',
  'unifunc' => 'content_55d47677e91514_04686069',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_55d47677e91514_04686069')) {function content_55d47677e91514_04686069($_smarty_tpl) {?>
<script src="http://libs.baidu.com/jquery/1.9.1/jquery.min.js"></script>
<script src="http://s1.bdstatic.com/r/www/cache/ecom/esl/2-0-4/esl.js"></script>
<script>
    require.config({
        'baseUrl': '<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
',
        'paths': {
            'tpl': './common/tpl',
            'main': './main'
        },
        'packages': [{
             'name': 'etpl',
             'location': './common/etpl/3.0.1/src',
             'main': 'main'
        }]
    });


    define('jquery', function (require) {
        return $;
    });

    <?php if (isset($_smarty_tpl->tpl_vars['extData']->value)){?>
    var EXT_DATA = <?php echo json_encode($_smarty_tpl->tpl_vars['extData']->value);?>
;
    <?php }?>

    <?php if (isset($_smarty_tpl->tpl_vars['paramData']->value)){?>
    var PARAM_DATA = <?php echo json_encode($_smarty_tpl->tpl_vars['paramData']->value);?>
;
    <?php }?>
</script>

<?php }} ?>