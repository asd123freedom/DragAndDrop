<?php
/**
 * @file 页面处理类
 * @author mengke01(kekee000@gmail.com)
 */


require_once(ROOT_DIR.'/libs/Smarty.class.php');


/**
 * 处理请求类
 */
class Service {

    protected $smarty;
    protected $tplPath; // 模板名称
    protected $config = array(); // 模板的配置

    /**
     * 构造函数
     *
     * @param  {array}  $config  要赋值的变量
     *
     * @param {array} $config['tplPath'] 模板文件路径
     * @param {array} $config['json'] 赋值的json文件数组
     * @param {array} $config['var'] 赋值的变量集合
     */
    public function __construct($config = array()) {

        $this->config = $config;
        $this->init();
        $this->doInit();
    }

    private function init() {

        $this->smarty = new Smarty();
        $this->smarty->assign('root', '/src');
        $this->smarty->assign('base_dir', '/src');
        $this->smarty->assign('health_host', '/src');

        $this->smarty->compile_dir = Conf::$rootDir . '/mock/templates_c';
        $this->smarty->template_dir = Conf::$rootDir . '/views';
    }


    /**
     * 获取url请求参数
     *
     * @param  {string} $name   名字
     * @param  {boolean} $isPost 是否post
     * @return {string} 参数值
     */
    public function getParam($name, $isPost) {
        if ($isPost) {
            return $_POST[$name];
        }
        return $_GET[$paramName];
    }

    /**
     * 设置一个smarty变量
     *
     * @param  {string} $key   参数数组或者参数名
     * @param  {string} $value 参数值
     * @param  {booelan} $merge 是否合并之前的数组
     * @return  {this}
     */
    public function assign($key, $value = '', $merge = false) {

        if (isAssoc($key)) {
            foreach ($key as $k => $v) {
                if ($merge && isAssoc($v)) {
                    $old = $this->smarty->getTemplateVars($k);
                    $v = array_merge($old, $v);
                }
                $this->smarty->assign($k, $v);
            }
        }
        else if (!empty($key)){
            if ($merge && isAssoc($value)) {
                $old = $this->smarty->getTemplateVars($key);
                if (isAssoc($old)) {
                    $value = array_merge($old, $value);
                }
            }
            $this->smarty->assign($key, $value);
        }

        return $this;
    }

    /**
     * 设置一个JSON文件
     * @param  {string} $filePath 文件路径
     * @param  {boolean} $isRelatedToMock 是否相对于mock根目录
     * @return  {this}
     */
    public function assignJsonFile($filePath, $isRelatedToMock = false) {
        // 远程文件
        if (strpos($filePath, 'http') === 0) {
            $json = readRemoteJson($filePath);
        }
        else {
            $json = readJson($filePath, $isRelatedToMock);
        }

        $this->assign($json);
        return $this;
    }

    /**
     * 获取赋值的变量
     *
     * @param  {string} $key 键
     * @return {Object} 参数值
     */
    public function &getAssign($key) {
        return $this->smarty->getTemplateVars($key);
    }

    /**
     * 展示当前的模板
     *
     * @param  {string} $filePath 模板路径
     * @param  {boolean} $isRelatedToMock 是否相对于mock根目录
     */
    public function display($filePath) {
        $ext = getFileExt($filePath);
        if (empty($ext)) {
            $filePath = $filePath . '.tpl';
            echo $filepath;
        }

        $this->smarty->display($filePath);
    }

    /**
     * 执行请求处理
     */
    public function doService() {

        $config = $this->config;

        if (!empty($config['json'])) {

            if (isAssoc($config['json'])) {
                foreach($config['json'] as $key => $file) {
                    $this->assign($key, readJson($file));
                }
            }
            else {
                foreach($config['json'] as $file) {
                    $this->assignJsonFile($file);
                }
            }
        }

        // 固定变量
        if (!empty($config['var'])) {
            $this->assign($config['var']);
        }

        if (!empty($config['tplData'])) {
            $this->assign('tplData', $config['tplData'], true);
        }

        if (!empty($config['extData'])) {
            $this->assign('extData', $config['extData'], true);
        }

        if (!empty($config['paramData'])) {
            $this->assign('paramData', $config['paramData'], true);
        }

        $templateVars = $this->smarty->getTemplateVars();
        $this->doModifyData($templateVars);

        if (!empty($config['tplPath'])) {
            $tplPath = preg_replace('#^[/\\\\]+#', '', $config['tplPath']);
            $this->display($config['tplPath']);
        }
    }

    /**
     * 初始化
     */
    protected function doInit() {
        $this->assignJsonFile('./common/data/header', true);
    }

    /**
     * 对数据进行填充和修改
     * @param  {Object} &$data 数据
     * @return {Object} 数据
     */
    protected function doModifyData(&$data) {
        return $data;
    }

}
