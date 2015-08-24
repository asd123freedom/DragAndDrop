
<script src="http://libs.baidu.com/jquery/1.9.1/jquery.min.js"></script>
<script src="http://s1.bdstatic.com/r/www/cache/ecom/esl/2-0-4/esl.js"></script>
<script>
    require.config({
        'baseUrl': '{$base_url}',
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

    {if isset($extData)}
    var EXT_DATA = {$extData|@json_encode};
    {/if}

    {if isset($paramData)}
    var PARAM_DATA = {$paramData|@json_encode};
    {/if}
</script>

