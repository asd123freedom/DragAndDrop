<?php /* Smarty version Smarty-3.1.13, created on 2015-08-11 16:30:57
         compiled from "/Users/liuchaofan/projects/Bing/views/common/script.tpl" */ ?>
<?php /*%%SmartyHeaderCode:101377800655abb5787b2f49-76843532%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'ef332dd707e035e868547f865621730ea35fad40' => 
    array (
      0 => '/Users/liuchaofan/projects/Bing/views/common/script.tpl',
      1 => 1439281615,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '101377800655abb5787b2f49-76843532',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.13',
  'unifunc' => 'content_55abb5787dd506_69071885',
  'variables' => 
  array (
    'base_url' => 0,
    'extData' => 0,
    'paramData' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_55abb5787dd506_69071885')) {function content_55abb5787dd506_69071885($_smarty_tpl) {?>
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