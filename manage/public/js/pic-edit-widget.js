(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define('jquery-edit', ['jquery-crop', 'jquery-filter', 'jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function($) {
    $.fn.picEdit = function(config) {

        var defaultConfig = {
            pic: ''
        };

        var config = $.extend(true, {}, defaultConfig, config);

        var params = {
			copHistory: [], //存放操作记录
			histCurrent: 0 ,// 当前操作
        };

		var ui = {};

		// 存放历史操作
        function pushHistory(img){
            params.copHistory.push({
                "src" :img.src, 'width':  img.width, 'height': img.height
            });
            params.histCurrent = 1;
			// 激活撤销按钮
			if(params.copHistory.length > 1) {
				ui.preStepBtn.addClass('pre-step-btn-act');
			}
        };

		// 居中, adjustMid.call(dom, width, height);
		function adjustMid (width, height) {
			this.css({
				"position": "absolute",
				'width': width+'px',
				'height': height+'px',
				'left': '50%',
				'top': '50%',
				'margin-top': -height/2+'px',
				'margin-left': -width/2+'px',
			});
		};

        // 更新pic, 每次编辑完都要更新pic，这个写的比较sb，可以直接在canvas上连续操作啊
        function updatePic(src, width, height) {
            adjustMid.call(ui.popPic.attr('src', src), width, height);
            pushHistory(ui.popPic[0]);
        };

		// 旋转，此法只支持顺时针和逆时针90度
		function rotate(deg){
			var canvas = ui.imgCanvas[0],
				img = ui.popPic[0],
				ctx = canvas.getContext("2d");
			var width = canvas.width = img.height,
				height = canvas.height = img.width;
			ctx.save();
			ctx.rotate(deg* Math.PI / 180);
			if(deg == -90)
				ctx.translate(-height, 0);
			if(deg == 90)
				ctx.translate(0, -width);
			ctx.drawImage(img, 0,0 );
			ctx.restore();
			updatePic( canvas.toDataURL("image/png"), width, height);
		};

        // 初始化ui，直接写死
        function initUI() {
            var uiHtml =
            '<div class="gallery-edit-panel">' +
                '<div class="gallery-toolbar">' +
                    '<h1 class="toolbar-title">图片管理器</h1>' +
                    '<a class="save-btn" href="javascript: void(0)"> 保存图片</a>' +
                    '<div class="cut-tool rotate-panel">' +
                        '<h2 class="cut-title to-rotate-btn">旋转' +
                        '</h2>' +
                        '<div class="cut-tool-panel">' +
                            '<div class="cut-btns">' +
                                '<a href="javascript: void(0)" class="cut-btn  right-rotate">顺时针</a>' +
								    '<a href="javascript: void(0)" class="cut-btn  left-rotate">逆时针</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="cut-tool">' +
                        '<h2 class="cut-title to-cut-btn">' +
                            '裁剪' +
                        '</h2>' +
                        '<div class="cut-tool-panel">' +
                            '<div class="cut-btns">' +
                            '    <a  class="cut-btn cancle-to-cut" href="javascript:void(0)">取消</a>' +
                                '<a class="cut-btn confirm-to-cut" href="javascript:void(0)">结束</a>' +
								' <a  class="cut-btn start-to-cut" href="javascript:void(0)">开始</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="cut-tool resize-panel">' +
                        '<h2 class="cut-title">' +
                            '调整大小' +
                        '</h2>' +
                      ' <div class="cut-tool-panel">' +
                            '<input class="cut-input resize-width" type="text">' +
                            ' &times;' +
                            '<input  class="cut-input resize-height" type="text">' +
                            '<div class="cut-btns">' +
                            	'<a  class="cut-btn confirm-resize-btn" href="javascript:void(0)">确定</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    ' <div class="cut-tool filter-panel">' +
                        '<h2 class="cut-title">' +
                        '    滤镜' +
                        '</h2>' +
                        '<div class="cut-tool-panel to-filter">' +
                            '<a id="invert-button">反色</a>' +
                            '<a id="adjst-button">灰色调</a>' +
                            '<a id="blur-button">模糊</a>' +
                            '<a id="relief-button">浮雕</a>' +
                            '<a id="diaoke-button">雕刻</a>' +
                            '<a id="mirror-button">镜像</a>' +
                        '</div>' +
                    '</div>' +
                    '<a class="pre-step-btn" href="javascript: void(0)"> 撤销</a>' +
                '</div>' +
                '<div class="pop-container">' +
                    '<a class="pop-close-btn" href="javascript: void(0)">&times;</a>' +
                    '<div class="pop-pic-wrap">' +
                        '<img class="pop-pic" />' +
                    '</div>' +
                    '<div class="pic-resize">' +
                        '<div class="title">滚动缩放</div>' +
                        '<span class="pic-size-val">100%</span>' +
						'<span class="pic-size-progress"><i class="circle"></i></span>' +
                    '</div>' +
                 '</div>' +
            '</div>';
            $('body').append($(uiHtml));

			ui = {
				container: $('.gallery-edit-panel'), // 弹出层容器
				popPic : $('.pop-pic'), //操作的图片
				popPicWrap: $('.pop-pic-wrap'), // 图片容器
				closeBtn: $('.pop-close-btn'), //弹出层关闭按钮
				preStepBtn: $('.pre-step-btn'), // 撤销，上一步
				saveBtn: $('.gallery-toolbar .save-btn'), // 保存图片
				startToCut: $('.start-to-cut'), // 开始剪裁
				confirmToCut: $('.confirm-to-cut'), // 确定剪裁
				cancleToCut: $('.cancle-to-cut'), // 取消剪裁
				wheelResize: $('.pic-resize') // 滚轮缩放区域
			}
        };

        function initEvents () {
			// 关闭组件
            ui.closeBtn.click(function(){
                ui.container.fadeOut(function() {
					ui.container.remove();
					location.href = '/pic';
				});
            })

			// 保存编辑后的图片
			ui.saveBtn.click(function(){
				 window.open( ui.popPic.attr('src')) ;
			});

            // 点击撤销，回退到上一步
            ui.preStepBtn.click(function(){
              	var hist;
              	if(params.histCurrent){ //当前，需pop一个
                  	params.copHistory.pop();
                  	params.histCurrent = 0;
              	}
              	if(params.copHistory.length == 1){
            		hist = params.copHistory[0];
					ui.preStepBtn.removeClass('pre-step-btn-act');
              	}else{
                    hist = params.copHistory.pop();
              	}
              	if(hist) {
				   	adjustMid.call(ui.popPic.attr('src',hist.src),
						hist.width, hist.height);
                }
            });

			// 点击开始剪裁， 初始化裁剪框
            ui.startToCut.click(function(){
				if(params.cutting)
					return;
				// 初始化裁剪组件，依赖crop-widget插件
				ui.cropBox = ui.canvasWrap.crop({
					width: 100,
					height: 100
				});
				params.cutting = 1;
            });

			// 点击确认剪裁
            ui.confirmToCut.click(function() {
				if(params.cutting) {
                    var canvas = ui.imgCanvas[0],  cropBox = ui.cropBox,
    					img = ui.popPic[0], canvasWrap = ui.canvasWrap[0];
                    canvas.height = cropBox.height();
                    canvas.width = cropBox.width();
                    var context = canvas.getContext("2d");
                    context.save();
    				// 相对于canvasWrap
                    var cl = cropBox.css('left').split('px')[0]-50;
                    var ct = cropBox.css('top').split('px')[0]-50;
    				// 调整为相对于img
    				var cropLeft = canvasWrap.offsetLeft + cl - img.offsetLeft;
    				var cropTop = canvasWrap.offsetTop + ct - img.offsetTop;
    				context.drawImage(img, cropLeft ,cropTop, canvas.width, canvas.height , 0,0, canvas.width, canvas.height);
                    updatePic( canvas.toDataURL("image/png"), canvas.width, canvas.height);
                    ui.cropBox.remove();
    				params.cutting = 0;
			     }
            });

			// 点击取消剪裁
            ui.cancleToCut.click(function(){
                ui.cropBox.remove();
				params.cutting = 0;
            });

			// 点击调整大小
            $('.confirm-resize-btn').click(function(){
                var canvas = ui.imgCanvas[0],
                    img = ui.popPic[0];
                canvas.height = $('.resize-height').val();
                canvas.width = $('.resize-width').val();
                var context = canvas.getContext("2d");
                context.save();
                context.drawImage(img, 0, 0, canvas.width , canvas.height);
                updatePic( canvas.toDataURL("image/png"), canvas.width, canvas.height);
            });

            // 鼠标滚轮缩放， 有bug , 没改
            ui.wheelResize.on('mousewheel', function(e){
                var img = ui.popPic[0];

                var zoom = parseInt(img.style.zoom, 10) || 100;
                zoom += event.wheelDelta >0 ? 20 :-20; //可适当修改
                if (zoom > 0 && zoom < 200){
					setTimeout(function(){
	                    img.style.zoom = zoom + '%';
		                $('.pic-size-val').html(zoom + '%');
						var leftC = $('.pic-size-progress .circle').css('left').split('px')[0];
						var offset = zoom<0 ? zoom * 0.1 : e.originalEvent.deltaY > 0 ? -20 * 0.7: 20 * 0.7;
						$('.pic-size-progress .circle').css({
							'left': parseInt(leftC) + parseInt(offset) + 'px'
						});
					} ,0);
				}
                return ;
            });

            $('.right-rotate').click(function () {
				rotate(90);
            });

			$('.left-rotate').click(function () {
				rotate(-90);
			});

        };

		function initCanvas() {
			var pic = config.pic[0];
	        updatePic(pic.src, pic.naturalWidth, pic.naturalHeight);
	        ui.container.fadeIn();
	        var oRelDiv = document.createElement("div");
	        oRelDiv.id = 'canvas-wrap';
			// canvas位置调整为和img一样
			adjustMid.call($(oRelDiv), ui.popPic.width(), ui.popPic.height());
	        oRelDiv.innerHTML = '<canvas id="zxxImageCanvas"style="position:absolute;display:none;"></canvas>';;
	        ui.popPicWrap.append($(oRelDiv));
			ui.canvasWrap = $('#canvas-wrap');
			ui.imgCanvas = $('#zxxImageCanvas');
		};

		// 初始化
        initUI();
		initCanvas();
		// 初始化滤镜组件， 依赖filter-widget组件
		$('.filter-panel').filter({
			canvas: ui.imgCanvas,
			img: ui.popPic,
			invert: $('#invert-button'),
			adjst: $('#adjst-button'),
			blur: $('#blur-button'),
			relief: $('#relief-button'),
			diaoke: $('#diaoke-button'),
			mirror: $('#mirror-button'),
			callback: function(){
				updatePic( ui.imgCanvas[0].toDataURL("image/png"), ui.imgCanvas.width, ui.imgCanvas.height);
			}
		});
        initEvents();
    }

}));
