/**
 * @file  图片放大弹窗组件
 * @author zhangfengqi(zfengqi90@163.com)
 */


/**
 * 构造函数
 * @param {HTMLElement|jqObject} main 主元素
 * @param {Object} options 配置对象
 * @param {string} options.mod 模式 默认是图片数量固定，可设置为图片会被动态添加(dynamic)
 */
function Slider(main, options) {
    var me = this;
    options = options || {};

    this.main = $(main);
    this.targetItem = options.targetItem || 'a';
    this.nextClass = options.nextClass || 'next';
    this.prevClass = options.prevClass || 'prev';
    this.closeClass = options.closeClas || 'close';
    this.textFieldClass = options.textFieldClass || 'title';
    this.overlayBgColor = options.overlayBgColor || '#000';
    this.overlayOpacity = options.overlayOpacity || 0.6;
    this.isNotScroll = options.isNotScroll || false;
    this.customRender = options.customRender;
    this.imgDataArr = [];
    this.activeIndex = options.activeIndex || 0;
    this.mod = options.mod;

    var targetItem = this.main.find(this.targetItem);

    if (targetItem && targetItem.length) {

        // 获取首屏大图url和描述
        targetItem.each(function (index, item) {

            me.updateImg(item, index);

        });

        this.main.on('click', this.targetItem, function (e) {
            var targetClicked = this;
            var targetItem = me.main.find(me.targetItem);

            // 阻止默认事件
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            else {
                window.event.returnValue = false;
            }

            // 动态更新后面加载进来的图片
            if (me.mod === 'dynamic') {
                var curLen = me.imgDataArr.length;

                for (var i = curLen; i < targetItem.length; i++) {
                    me.updateImg(targetItem[i], i);
                }
            }
            me.init(targetClicked);

            return false;
        });
    }

    $(window).on('resize', function () {
        $('#slider-overlay').css({
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight
        }).fadeIn();
    });

}

Slider.prototype.init = function (targetClicked) {
    var me = this;
    // this.imgDataArr.length = 0;

    // 生成弹出层DOM
    this.setPopup();

    // 找到当前点击块的索引
    this.activeIndex = +$(targetClicked).data('index');
    // while (this.imgDataArr[this.activeIndex]['href'] !== targetClicked.href) {
    //     this.activeIndex++;
    // }

    this.nextPrevHandler();

    // 加载显示大图并调整位置
    this.showImg(targetClicked);

};

/**
 * 更新图片数量
 *
 */
Slider.prototype.updateImg = function (item, index) {
    // 存储index属性
    $(item).data('index', index);

    var data = {
        href: item.href,
        desc: item[this.textFieldClass]
    };

    this.imgDataArr.push(data);
};

/**
 * 设置弹出层DOM & 绑定相关事件
 *
 */
Slider.prototype.setPopup = function () {
    var me = this;
    var popupHTML = ''
        + '<div id="slider-overlay"></div>'
        + '<div id="slider-box">'
        +   '<a href="javascript:;" class="' + this.closeClass + '"></a>'
        +   '<div class=slider-innerbox>'
        +       '<a href="javascript:;" class="' + this.prevClass + '"></a>'
        +       '<div class="slider-img-box">'
        +           '<span class="slider-loading"></span>'
        +           '<img alt="" class="slider-img" >'
        +           '<span class="description"></span>'
        +       '</div>'
        +       '<a href="javascript:;" class="' + this.nextClass + '"></a>'
        +   '</div>'
        + '</div>';

    $('body').append(popupHTML);

    // 隐藏滚动条 禁止滚动
    if (this.isNotScroll) {
        this.scrollForbidden();
        $('body').addClass('compensate-for-scrollbar');
    }

    // 设置样式
    $('#slider-overlay').css({
        backgroundColor: me.overlayBgColor,
        opacity: me.overlayOpacity,
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight
    }).fadeIn();



    // 点击关闭事件
    $('#slider-box .' + this.closeClass).on('click', function () {
        $(this).off('click');
         $('body').removeClass('compensate-for-scrollbar');
        me.remove();
    });

    // 上一张点击事件
     $('#slider-box .' + this.prevClass).on('click', function () {
        me.activeIndex--;

        me.nextPrevHandler();

        me.showImg();

    });

    // 下一张点击事件
    $('#slider-box .' + this.nextClass).on('click', function () {
        me.activeIndex++;

        me.nextPrevHandler();

        me.showImg();

    });
};

/**
 * 判断上下一张是否显示
 *
 */
Slider.prototype.nextPrevHandler = function () {
    var $prevBtn = $('#slider-box .' + this.prevClass);
    var $nextBtn = $('#slider-box .' + this.nextClass);

    this.activeIndex === 0 ? $prevBtn.hide() : $prevBtn.show();

    this.activeIndex === this.imgDataArr.length - 1 ? $nextBtn.hide() : $nextBtn.show();

};

/**
 * 关闭移除弹窗
 */
Slider.prototype.remove = function () {
    $('#slider-box').remove();
    $('#slider-overlay').fadeOut(function () {
        $('#slider-overlay').remove();
    });

};

/**
 * 加载显示大图 调整位置
 *
 */
Slider.prototype.showImg = function () {
    var me = this;

    var placeHolder = new Image();
    var imgSrc = this.imgDataArr[this.activeIndex]['href'];

    // 预加载前后图片
    this.preload();

    placeHolder.onload = function () {
        $('#slider-box .slider-loading').hide();

        var sliderImg = $('#slider-box .slider-img');
        var clientHeight = document.documentElement.clientHeight;

        sliderImg.attr('src', imgSrc);

        if (placeHolder.height >= clientHeight) {
            sliderImg.attr('height', clientHeight - 50 + 'px');

            $('#slider-box .slider-img-box').css({
                "margin-left": - 1/2 * placeHolder.width,
                "margin-top": - 1/2 * (clientHeight - 50)
            });
        }
        else {
            $('#slider-box .slider-img-box').css({
                "margin-left": - 1/2 * placeHolder.width,
                "margin-top": - 1/2 * placeHolder.height
            });
        }

        $('#slider-box .description').html(me.imgDataArr[me.activeIndex]['desc']);

    };

    placeHolder.src = imgSrc;

};

/**
 * 预加载相邻图片
 *
 */
Slider.prototype.preload = function () {
    if (this.activeIndex < this.imgDataArr.length - 1) {
        var nextPreloader = new Image();
        nextPreloader.src = this.imgDataArr[this.activeIndex + 1]['href'];
    }

    if (this.activeIndex > 0) {
        var prevPreloader = new Image();
        prevPreloader.src = this.imgDataArr[this.activeIndex - 1]['href'];
    }
};

/**
 * 弹窗出现时禁止滚动
 *
 */
Slider.prototype.scrollForbidden = function () {
    if ($('.modal-measure-scrollbar').length > 0) {
        return;
    }

    var wrapper = $('<div class="modal-measure-scrollbar"></div>').prependTo('body');
    var inner = $('<div class="inner"></div>').appendTo(wrapper);
    var scrollBarWidth = wrapper.width() - inner.width();
    wrapper.remove();

    $('head').append('<style type="text/css">'
                    +   '.compensate-for-scrollbar{ '
                    +       'margin-right:' + scrollBarWidth + 'px;'
                    +       'overflow-y: hidden;'
                    +   '}'
                    + '</style>');

};
