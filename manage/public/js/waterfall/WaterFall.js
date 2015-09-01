/**
 * @file    基于jquery的瀑布流组件
 * @author  zhangfengqi(zfengqi90@163.com)
 * @date    2015.08.22
 */

/**
 * @constructor 构造函数
 *
 * @param {HTMLElement|jQueryObjet} main 瀑布流主容器
 * @param {string} url 异步加载url
 * @param {Object} options 配置参数
 * @param {string} options.birckItemClass 图片块的classname 默认为'brick'
 * @param {number} options.margin 图片块间距 默认为10
 * @param {number} options.minCols 显示的最小列数 默认为3
 * @param {string} options.ajaxDataInterface ajax数据中的图片url接口 默认为'src'
 * @param {Function} options.onRender 自定义数据块html模板函数 返回值为html模板字符串
 */
function WaterFall(main, url, options) {
    var me = this;
    options = options || {};

    this.main = $(main);
    this.brickItemClass = options.brickItemClass || 'brick';

    this.margin = options.margin || 10;
    this.brickWidth = +this.main.find('.' + this.brickItemClass).get(0).offsetWidth + this.margin;

    this.colHeights = []; // 各列高度
    this.ajaxUrl = url;
    this.ajaxDataInterface = options.ajaxDataInterface || 'src';
    this.minCols = options.minCols || 3;
    this.onRender = options.onRender;

    $(window).on('scroll', function () {
        if (me.checkLoadCondition()) {
            me.loadData(me.ajaxUrl);
        }
    });

    $(window).on('resize', this.throttle(function () {
        // 清空重新获取
        this.colHeights = [];
        this.mainWidth = this.main.get(0).offsetWidth;

        this.adjustPos(true);
    }, 400, 800));

    this.adjustPos();
}

/**
 * 设置数据块的位置
 *
 * @param {boolean} hasAnimate 位置调整时是否有动效
 */
WaterFall.prototype.adjustPos = function (hasAnimate) {
    var me = this;
    var brickItem = this.main.find('.' + this.brickItemClass);
    var minHeight;
    var minColIndex;

    if (brickItem) {
        var clientWidth = document.documentElement.clientWidth;
        var cols = Math.floor((clientWidth + this.margin) / this.brickWidth);
        cols = Math.max(cols, this.minCols);

        var containerWidth = cols * this.brickWidth - this.margin;
        this.main.closest('.container').css('width', containerWidth + 'px');

        brickItem.css('position', 'absolute');

        brickItem.each(function (index, item) {
            if (index < cols) {
                $(item).css({
                    top: 0,
                    left: me.brickWidth * index
                });

                me.colHeights.push(+item.offsetHeight + me.margin);
            }
            else {
                // 找到最小高度 & 其所在的列索引值
                me.setPos(item, hasAnimate);
            }

        });
    }
};

/**
 * @inner 设置数据块位置辅助
 *
 * @param {HTMLElement} item 数据块
 * @param {boolean} hasAnimate 是否有动效
 */
WaterFall.prototype.setPos = function (item, hasAnimate) {
    var me = this;
    var minHeight = Math.min.apply(null, this.colHeights);
    var minColIndex = 0;

    for (var i = 0; i < this.colHeights.length; i++) {
        if (this.colHeights[i] === minHeight) {
            minColIndex = i;
            break;
        }
    }

    $(item).css('position', 'absolute');

    if (hasAnimate) {
        $(item).animate({
            top: minHeight,
            left: me.brickWidth * minColIndex
        });
    }
    else {
        $(item).css({
            top: minHeight,
            left: me.brickWidth * minColIndex
        });
    }
    // 更新每列高度值
    this.colHeights[minColIndex] += item.offsetHeight + this.margin;
    // 调整容器高度
    this.main.css({
        height: Math.max.apply(null, this.colHeights)
    });

    return this;
};

/**
 * 判断加载数据的条件
 *
 * @return {boolean} 是否满足条件
 */
WaterFall.prototype.checkLoadCondition = function () {
    var me = this;
    // 触发条件：最后一张图露出一半
    var lastBrick = this.main.find('.' + this.brickItemClass).get(-1);
    var lastBrickTop = lastBrick.offsetTop + 0.5 * lastBrick.offsetHeight;
    var trigger = $(document).scrollTop() + document.documentElement.clientHeight;

    if (lastBrick && lastBrickTop < trigger) {
        return true;
    }

    return false;
};

/**
 * 加载数据
 *
 * @param {string} url ajax数据接口
 */
WaterFall.prototype.loadData = function (url) {
    var me = this;

    $.ajax(url, {
        success: function (data) {
            if (data.length > 0) {

                for (var i = 0; i < data.length; i++) {
                    var src = data[i][me.ajaxDataInterface];

                    (function (index) {
                        me.getImgSize(src, function (width, height) {
                            me.render(data[index], width, height);
                        });
                    })(i);
                }
            }
        }
    });
};

/**
 * 获取加载图片的尺寸
 *
 * @param {string} url 图片url
 * @param {Function} loadedCb 图片加载完成后的回调函数
 */
WaterFall.prototype.getImgSize = function (url, loadedCb) {
    var imgLoader = new Image();

    imgLoader.onload = function () {
        var width = imgLoader.width;
        var height = imgLoader.height;

        loadedCb && loadedCb(width, height);

        imgLoader = imgLoader.onload = null;
    };

    imgLoader.src = url;
};

/**
 * 单个数据块DOM结构渲染
 *
 * @param {Object} dataItem ajax数据对象
 * @param {number} width    加载的图片宽度
 * @param {number} height   加载的图片高度
 */
WaterFall.prototype.render = function (dataItem, width, height) {
    var me = this;
    var src = dataItem[me.ajaxDataInterface];

    var renderer = this.onRender || function () {
        var tpl = ''
            + '<li class="' + me.brickItemClass + '">'
            +   '<div class="pic">'
            +     '<a href="' + dataItem.bigPic + '" title="'+ dataItem.desc +'">'
            +       '<img src="' + src + '" height="' + height + 'px" alt="">'
            +     '</a>'
            +   '</div>'
            + '</li>';

        return tpl;
    };

    this.main.append(renderer.call(this));

    var brickItem = this.main.find('.' + this.brickItemClass);

    // 只为最新加载进来的图片设置top left
    me.setPos(brickItem.last().get(0));
};

/**
 * @inner 函数节流
 *
 * @param {Function} method 要执行的函数
 * @param {number} delay 延迟时间
 * @param {number} mustRunDelay 至少xx秒执行一次
 * @return {Function}
 *
 */
WaterFall.prototype.throttle = function (method, delay, mustRunDelay) {
    var me = this;
    var timer = null;
    var startTime = 0;

    return function () {
        var curTime = +new Date();
        var args = arguments;

        clearTimeout(timer);

        if (!startTime) {
            startTime = curTime;
        }

        if (curTime - startTime > mustRunDelay) {
            method.apply(me, args);
            startTime = curTime;
        }
        else {
            timer = setTimeout(function () {
                method.apply(me, args);
            }, delay);
        }

    };

};
