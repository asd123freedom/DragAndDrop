(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define('jquery-crop', ['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function($) {
    $.fn.crop = function(config) {
        var defaultConfig = {
			height: 100, // 裁剪框高
			width: 100
        };
        var config = $.extend(true, {}, defaultConfig, config);
		var ui = {};
		var params ={
			// 拖动裁剪区域相关
            left: 0,
            top: 0,
            width:0,
            height:0,
            currentX: 0,
            currentY: 0,
			//
            kind: "drag", // 裁剪区域操纵类型
			cutReady: 0, //按下鼠标准备裁剪？
			cutting: 0, //正在裁剪？,
		};
        // 初始化ui
        function initUI(self) {
			var sInnerHtml =
				 '<div id="zxxCropBox" style="height:'+config.height+'px; width:'+config.width+'px; position:absolute; z-index: 9999999;left:50%; top:50%;margin-left:-50px;margin-top:-50px; border:1px solid black;">'
					+ '<div id="zxxDragBg" ></div>'
					+ '<div id="dragLeftTop" class="cut-drag-point" style="left:-3px; top:-3px; cursor:nw-resize;"> </div>'
					+ '<div id="dragLeftBot" class="cut-drag-point" style=" left:-3px; bottom:-3px; cursor:sw-resize;"></div>'
					+ '<div id="dragRightTop" class="cut-drag-point" style="right:-3px; top:-3px; cursor:ne-resize;"></div>'
					+ '<div id="dragRightBot" class="cut-drag-point" style=" right:-3px; bottom:-3px; cursor:se-resize;"></div>'
					+ '<div id="dragTopCenter" class="cut-drag-point" style=" top:-3px; left:50%; margin-left:-3px; cursor:n-resize;"></div>'
					+ '<div id="dragBotCenter" class="cut-drag-point" style=" bottom:-3px; left:50%; margin-left:-3px; cursor:s-resize;"> </div>'
					+ '<div id="dragRightCenter" class="cut-drag-point" style="right:-3px; top:50%; margin-top:-3px; cursor:e-resize;"></div>'
					+ '<div id="dragLeftCenter" class="cut-drag-point" style="left:-3px; top:50%; margin-top:-3px; cursor:w-resize;"></div>'
				+ '</div>';
			self.append($(sInnerHtml));
			ui.cropBox = $('#zxxCropBox');
        }
		function startDrag(point, kind){
			var target = ui.cropBox;
			params.width = target.css('width');
			params.height = target.css('height');
			if(target.css('left') !== "auto"){
				params.left = target.css('left');
			}
			if(target.css('top') !== "auto"){
				params.top = target.css('top');
			}
			point[0].onmousedown = function(event){
				var e = event || window.event;
				params.cutReady = 1;
				params.kind = kind;
				params.currentX = e.clientX;
				params.currentY = e.clientY;
			};
			document.onmouseup = function(){
				params.cutReady = 0;
				if(target.css('left') !== "auto"){
					params.left = target.css('left');
				}
				if(target.css('top') !== "auto"){
					params.top = target.css('top');
				}
				params.width = target.css('width');
				params.height = target.css('height');

			};
			document.onmousemove = function(event){
				var e = event || window.event;
				if(params.cutReady){
					var nowX = e.clientX, nowY = e.clientY;
					var disX = nowX - params.currentX, disY = nowY - params.currentY;
					var top = parseInt(params.top);
						left = parseInt(params.left),
						width = parseInt(params.width),
						height = parseInt(params.height);
					if(params.kind === "n"){
						//上拉伸
						//高度增加或减小，位置上下移动
						target.css( "top", top + disY + "px");
						target.css( "height", height - disY + "px");
					}else if(params.kind === "w"){//左拉伸
						target.css( "left", left + disX + "px");
						target.css( "width",  width - disX + "px");
					}else if(params.kind === "e"){//右拉伸
						target.css( "width",  width + disX + "px");
					}else if(params.kind === "s"){//下拉伸
						target.css( "height", height + disY + "px");
					}else if(params.kind === "nw"){//左上拉伸
						target.css( "left", left + disX + "px");
						target.css( "width",  width - disX + "px");
						target.css( "top", top + disY + "px");
						target.css( "height", height - disY + "px");
					}else if(params.kind === "ne"){//右上拉伸
						target.css( "top", top + disY + "px");
						target.css( "height", height - disY + "px");
						//右
						target.css( "width",  width + disX + "px");
					}else if(params.kind === "sw"){//左下拉伸
						target.css( "left", left + disX + "px");
						target.css( "width",  width - disX + "px");
						//下
						target.css( "height", height + disY + "px");
					}else if(params.kind === "se"){//右下拉伸
						target.css( "width", width + disX + "px");
						target.css( "height", height + disY + "px");
					}else{//移动
						target.css( "left", left + disX + "px");
						target.css( "top", top + disY + "px");
					}
				}
			}
		};
		function initEvents() {
			//绑定拖拽
			startDrag($("#zxxDragBg"),"drag");
			//绑定拉伸
			startDrag($("#dragLeftTop"),"nw");
			startDrag($("#dragLeftBot"),"sw");
			startDrag($("#dragRightTop"),"ne");
			startDrag($("#dragRightBot"),"se");
			startDrag($("#dragTopCenter"),"n");
			startDrag($("#dragBotCenter"),"s");
			startDrag($("#dragRightCenter"),"e");
			startDrag($("#dragLeftCenter"),"w");
		}

        this.each(function() {
            var self = $(this);
            initUI(self);
            initEvents();

        });

		return ui.cropBox;
    }

}));
