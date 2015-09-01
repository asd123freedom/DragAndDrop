(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define('jquery-filter', ['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function($) {
    $.fn.filter = function(config) {
        var defaultConfig = {
			canvas: '',
			img: '',
			invert: '',
			adjst: '',
			blur: '',
			relief: '',
			diaoke: '',
			mirror: '',
			callback: null
        };

        var config = $.extend(true, {}, defaultConfig, config);
		var gfilter = {
			getInfo: function () {
				return this.author + ' ' + this.type + ' ' + this.name;
			},
			colorInvertProcess: function(binaryData, l) {
				for (var i = 0; i < l; i += 4) {
					var r = binaryData[i];
					var g = binaryData[i + 1];
					var b = binaryData[i + 2];

					binaryData[i] = 255-r;
					binaryData[i + 1] = 255-g;
					binaryData[i + 2] = 255-b;
				}
			},
			colorAdjustProcess: function(binaryData, l) {
				for (var i = 0; i < l; i += 4) {
					var r = binaryData[i];
					var g = binaryData[i + 1];
					var b = binaryData[i + 2];

					binaryData[i] = (r * 0.272) + (g * 0.534) + (b * 0.131);
					binaryData[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
					binaryData[i + 2] = (r * 0.393) + (g * 0.769) + (b * 0.189);
				}
			},
			copyImageData: function(context, src)
			{
				var dst = context.createImageData(src.width, src.height);
				dst.data.set(src.data);
				return dst;
			},
			blurProcess: function(context, canvasData) {
				console.log("Canvas Filter - blur process");
				var tempCanvasData = this.copyImageData(context, canvasData);
				var sumred = 0.0, sumgreen = 0.0, sumblue = 0.0;
				for ( var x = 0; x < tempCanvasData.width; x++) {
					for ( var y = 0; y < tempCanvasData.height; y++) {

						var idx = (x + y * tempCanvasData.width) * 4;
						for(var subCol=-2; subCol<=2; subCol++) {
							var colOff = subCol + x;
							if(colOff <0 || colOff >= tempCanvasData.width) {
								colOff = 0;
							}
							for(var subRow=-2; subRow<=2; subRow++) {
								var rowOff = subRow + y;
								if(rowOff < 0 || rowOff >= tempCanvasData.height) {
									rowOff = 0;
								}
								var idx2 = (colOff + rowOff * tempCanvasData.width) * 4;
								var r = tempCanvasData.data[idx2 + 0];
								var g = tempCanvasData.data[idx2 + 1];
								var b = tempCanvasData.data[idx2 + 2];
								sumred += r;
								sumgreen += g;
								sumblue += b;
							}
						}

						// calculate new RGB value
						var nr = (sumred / 25.0);
						var ng = (sumgreen / 25.0);
						var nb = (sumblue / 25.0);
						// clear previous for next pixel point
						sumred = 0.0;
						sumgreen = 0.0;
						sumblue = 0.0;
						// assign new pixel value
						canvasData.data[idx + 0] = nr; // Red channel
						canvasData.data[idx + 1] = ng; // Green channel
						canvasData.data[idx + 2] = nb; // Blue channel
						canvasData.data[idx + 3] = 255; // Alpha channel
					}
				}
			},

			reliefProcess: function(context, canvasData) {
				console.log("Canvas Filter - relief process");
				var tempCanvasData = this.copyImageData(context, canvasData);
				for ( var x = 1; x < tempCanvasData.width-1; x++)
				{
					for ( var y = 1; y < tempCanvasData.height-1; y++)
					{

						// Index of the pixel in the array
						var idx = (x + y * tempCanvasData.width) * 4;
						var bidx = ((x-1) + y * tempCanvasData.width) * 4;
						var aidx = ((x+1) + y * tempCanvasData.width) * 4;

						// calculate new RGB value
						var nr = tempCanvasData.data[aidx + 0] - tempCanvasData.data[bidx + 0] + 128;
						var ng = tempCanvasData.data[aidx + 1] - tempCanvasData.data[bidx + 1] + 128;
						var nb = tempCanvasData.data[aidx + 2] - tempCanvasData.data[bidx + 2] + 128;
						nr = (nr < 0) ? 0 : ((nr >255) ? 255 : nr);
						ng = (ng < 0) ? 0 : ((ng >255) ? 255 : ng);
						nb = (nb < 0) ? 0 : ((nb >255) ? 255 : nb);

						// assign new pixel value
						canvasData.data[idx + 0] = nr; // Red channel
						canvasData.data[idx + 1] = ng; // Green channel
						canvasData.data[idx + 2] = nb; // Blue channel
						canvasData.data[idx + 3] = 255; // Alpha channel
					}
				}
			},

			diaokeProcess: function(context, canvasData) {
				console.log("Canvas Filter - process");
				var tempCanvasData = this.copyImageData(context, canvasData);
				for ( var x = 1; x < tempCanvasData.width-1; x++)
				{
					for ( var y = 1; y < tempCanvasData.height-1; y++)
					{

						// Index of the pixel in the array
						var idx = (x + y * tempCanvasData.width) * 4;
						var bidx = ((x-1) + y * tempCanvasData.width) * 4;
						var aidx = ((x+1) + y * tempCanvasData.width) * 4;

						// calculate new RGB value
						var nr = tempCanvasData.data[bidx + 0] - tempCanvasData.data[aidx + 0] + 128;
						var ng = tempCanvasData.data[bidx + 1] - tempCanvasData.data[aidx + 1] + 128;
						var nb = tempCanvasData.data[bidx + 2] - tempCanvasData.data[aidx + 2] + 128;
						nr = (nr < 0) ? 0 : ((nr >255) ? 255 : nr);
						ng = (ng < 0) ? 0 : ((ng >255) ? 255 : ng);
						nb = (nb < 0) ? 0 : ((nb >255) ? 255 : nb);

						// assign new pixel value
						canvasData.data[idx + 0] = nr; // Red channel
						canvasData.data[idx + 1] = ng; // Green channel
						canvasData.data[idx + 2] = nb; // Blue channel
						canvasData.data[idx + 3] = 255; // Alpha channel
					}
				}
			},

			mirrorProcess : function(context, canvasData) {
				console.log("Canvas Filter - process");
				var tempCanvasData = this.copyImageData(context, canvasData);
				for ( var x = 0; x < tempCanvasData.width; x++) // column
				{
					for ( var y = 0; y < tempCanvasData.height; y++) // row
					{

						// Index of the pixel in the array
						var idx = (x + y * tempCanvasData.width) * 4;
						var midx = (((tempCanvasData.width -1) - x) + y * tempCanvasData.width) * 4;

						// assign new pixel value
						canvasData.data[midx + 0] = tempCanvasData.data[idx + 0]; // Red channel
						canvasData.data[midx + 1] = tempCanvasData.data[idx + 1]; ; // Green channel
						canvasData.data[midx + 2] = tempCanvasData.data[idx + 2]; ; // Blue channel
						canvasData.data[midx + 3] = 255; // Alpha channel
					}
				}
			}
		};

        function initEvents() {
			config.invert.click(function(){
			    invertColor('invert');
			});

			config.adjst.click(function(){
			    invertColor('adjst');
			});

			config.blur.click(function(){
				invertColor('blur');
			});

			config.relief.click(function(){
				invertColor('fudiao');
			})

			config.diaoke.click(function(){
				invertColor('diaoke');
			});

			config.mirror.click(function(){
				invertColor('mirror');
			});
        }
		function invertColor( kind) {
			var canvas = config.canvas[0],
				img = config.img[0],
				cxt = canvas.getContext("2d");
				canvas.width = config.img.width();
				canvas.height = config.img.height();
			var len = canvas.width * canvas.height * 4;

			cxt.drawImage(img, 0, 0, canvas.width, canvas.height);
			var canvasData = cxt.getImageData(0, 0, canvas.width, canvas.height);  console.log(canvasData);
			var binaryData = canvasData.data;
			switch(kind) {
				case 'invert':
					gfilter.colorInvertProcess(binaryData, len);
					break;
				case 'adjst':
					gfilter.colorAdjustProcess(binaryData, len);
					break;
				case 'blur':
					gfilter.blurProcess(cxt, canvasData);
					break;
				case 'fudiao':
					gfilter.reliefProcess(cxt, canvasData);
					break;
				case 'diaoke':
					gfilter.diaokeProcess(cxt, canvasData);
					break;
				case 'mirror':
					gfilter.mirrorProcess(cxt, canvasData);
					break;
			}
			cxt.putImageData(canvasData, 0, 0);
			config.callback();
		}

        return this.each(function() {
            var self = $(this);
            initEvents();
        });

    }

}));
