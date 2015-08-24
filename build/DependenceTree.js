/**
 * @file 依赖树模块
 * @author mengke01(kekee000@gmail.com)
 */


/**
 * 依赖树组件
 * @param {Array} tree 树数组
 *
 * tree = [
 *   {
 *       origin: '{$base}/main.css', // 原始引用
 *       file:　'src/main.less', // 相关文件
 *       type: 'css', // 资源类型
 *       // 相关依赖
 *       deps: [
 *           {
 *               origin: './img/bg.png',
 *               file: 'src/img/bg.png',
 *               type: 'pic'
 *           }
 *       ]
 *   }
 * ]
 */
function Tree(tree) {
    this.tree = tree;
}


/**
 * 遍历树节点，根据filter获取节点
 *
 * @param  {Array} tree 依赖树
 * @param  {Function} fileFilter 过滤器
 * @return {Array}  结果节点
 */
function getResource(tree, fileFilter) {
    var list = [];
    var listMap = {};
    function walk(nodeList) {
        for (var i = 0, item; item = nodeList[i]; i++) {
            if (listMap[item.file]) {
                continue;
            }

            if (fileFilter(item)) {
                list.push(item);
                listMap[item.file] = true;
            }

            if (item.deps && item.deps.length) {
                walk(item.deps);
            }
        }
    }

    walk(tree);
    return list;
}


Tree.prototype.set = function (tree) {
    this.tree = tree;
};

Tree.prototype.get = function () {
    return this.tree;
};

/**
 * 获取css列表
 *
 * @param  {Function} filter 过滤器
 * @return {Array}        资源集合
 */
Tree.prototype.getCss = function (filter) {
    return getResource(this.tree, filter || function (res) {
        return res.type === 'css';
    });
};


/**
 * 获取less列表
 *
 * @param  {Function} filter 过滤器
 * @return {Array}        资源集合
 */
Tree.prototype.getLess = function (filter) {
    return getResource(this.tree, filter || function (res) {
        return res.type === 'css' && res.file.lastIndexOf('.less') === res.file.length - 5;
    });
};

/**
 * 获取stylus列表
 *
 * @param  {Function} filter 过滤器
 * @return {Array}        资源集合
 */
Tree.prototype.getStylus = function (filter) {
    return getResource(this.tree, filter || function (res) {
        return res.type === 'css' && res.file.lastIndexOf('.styl') === res.file.length - 5;
    });
};

/**
 * 获取require js模块列表
 *
 * @param  {Function} filter 过滤器
 * @return {Array}        资源集合
 */
Tree.prototype.getJSModules = function (filter) {
    return getResource(this.tree, filter || function (res) {
        return res.type === 'require';
    });
};


/**
 * 获取指定节点
 *
 * @param  {Function} filter 过滤器
 * @return {Array}        资源集合
 */
Tree.prototype.getItems = function (filter) {
    return getResource(this.tree, filter || function () {
        return true;
    });
};

/**
 * 获取叶节点
 *
 * @param  {Function} filter 过滤器
 * @return {Array}        资源集合
 */
Tree.prototype.getLeaf = function (filter) {
    return getResource(this.tree, filter || function (res) {
        return !res.deps || res.deps.length === 0;
    });
};

/**
 * 移除指定节点
 *
 * @param  {Function} filter 过滤器
 */
Tree.prototype.removeItems = function (filter) {

    // 标记为`deleted`的节点会被移除
    filter = filter || function (res) {
        return res.deleted === true;
    };

    function walk(treeNodeList) {
        for (var i = treeNodeList.length - 1; i >= 0; i--) {
            if (filter(treeNodeList[i])) {
                treeNodeList.splice(i, 1);
            }
            else {
                if (treeNodeList[i].deps) {
                    walk(treeNodeList[i].deps);
                    // 如果deps都被移出了，可以不要了
                    if (!treeNodeList[i].deps.length) {
                        delete treeNodeList[i].deps;
                    }
                }
            }
        }
    }

    walk(this.tree);
};

/**
 * 返回资源文件
 *
 * @param  {Array} resList 资源列表
 * @return {Array}  文件列表
 */
Tree.prototype.getFiles = function (resList) {
    return resList.map(function (res) {
        return res.file;
    });
};

/**
 * 获取文件相关的map，默认`md5`
 * @param  {Function} filter 过滤器
 * @param  {string} prop 参数
 * @return {Object}  map对象
 */
Tree.prototype.getFileMap = function (filter, prop) {
    prop = prop || 'md5';
    var hash = {};
    getResource(this.tree, filter || function () {
        return true;
    }).forEach(function (res) {
        if (!hash.hasOwnProperty(res.file)) {
            hash[res.file] = res[prop];
        }
    });
    return hash;
};

/**
 * 合并同类型的资源依赖
 * @param  {string} type    类型
 * @param  {Array} subTree 子树
 */
Tree.prototype.merge = function (type, subTree) {
    var treeHash = {}
    subTree.forEach(function (item) {
        treeHash[item.file] = item;
    });

    function walk(nodeList) {
        for (var i = 0, node; node = nodeList[i]; i++) {
            if (node.type === type && treeHash[node.file]) {
                node.deps = treeHash[node.file].deps;
            }
            if (node.deps && node.deps.length) {
                walk(node.deps);
            }
        }
    }

    walk(this.tree);
};


module.exports = exports = Tree;
