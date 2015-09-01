(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define('jquery-upload', ['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function($) {
    $.fn.upload = function(config) {
        var defaultConfig = {
            uploadUrl: '/upload'
        };

        var config = $.extend(true, {}, defaultConfig, config);

        var global = {
            filesSelect: [],
            index: 0
        };
        // 初始化ui
        function initUI() {
            var uiHtml =
                '<div class="upload-widget-mask screen-fixed">' +
                '</div>' +
                '<div class="upload-widget screen-fixed">' +
                    '<a class="close-btn" href="javascript: void(0)">&times;</a>' +
                    '<form id="uploadForm" action="/upload" method="post" enctype="multipart/form-data">' +

                            '<div class="upload_main">' +
                                '<div class="upload_choose">' +
                                    '<a class="mockFileBtn" href="javascript:void(0)">选择文件</a>' +
                                    '<input  id="fileImage" type="file" size="30" name="fileselect[]" multiple="multiple"  />' +
                                    '<span id="fileDragArea" class="upload_drag_area">或者将图片拖到此处</span>' +
                                '</div>' +
                                '<div id="preview" class="upload_preview">' +
                                    '<div class="upload_loading"></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="upload_submit">' +
                                '<button type="button" id="fileSubmit" class="upload_submit_btn">确认上传图片</button>' +
                            '</div>' +
                            '<div id="uploadInf" class="upload_inf"></div>' +

                    '</form>' +

                '</div>';

                $('body').append($(uiHtml));
        }
        // 选择文件的预览， btn和拖拽方式都用到
        function handleFile(file) {
            // var files = evt.target.files;
            // var file = files[0];
            var html = '';
            i = global.index;
            if (file) {

                $('.upload_submit').fadeIn();
                if( !global.filesSelect.length) { // 无文件， 第一次
                    $("#preview").fadeIn();
                }
                global.filesSelect.push(file);

                var reader = new FileReader()
                reader.onload = function(e) {
                    html = html + '<div id="uploadList_'+ i +'" class="upload_append_list"><p><strong>' + file.name + '</strong>'+
                        '<a href="javascript:" class="upload_delete" title="删除" data-index="'+ i +'">删除</a><br />' +
                        '<img id="uploadImage_' + i + '" src="' + e.target.result + '" class="upload_image" /></p>'+
                        '<span id="uploadProgress_' + i + '" class="upload_progress"></span>' +
                    '</div>';

                    global.index++;
                    $(".upload_loading").append(html);

                    $('.upload_delete').click(function() {
                        var index = $(this).data('index');
                        global.filesSelect.splice(index, 1);
                        $('#uploadList_' + index).remove();
						global.index--;
                    })
                }
                reader.readAsDataURL(file);
            }
        }
        //选择文件之后直接上传
        function uploadImages() {
            var form = new FormData();
            for(var i in global.filesSelect) {
                form.append("file", global.filesSelect[i]);
            }
            $.ajax({
                url: config.uploadUrl,
                type: 'post',
                data: form,
                contentType: false,
                processData: false,
            }).done(function () {
                console.log('success!');
				location.reload();
            });
        }

        function initEvents () {
            // 触发上传按钮
            $('.mockFileBtn').click(function(){
                $('#fileImage').trigger('click');
            })
            // 关闭组件
            $('.close-btn ').click(function(){
                $('.upload-widget-mask').fadeOut();
                $('.upload-widget').fadeOut();
            })
            // 打开文件btn
            $('#fileImage').on('change', function(evt) {
				
                handleFile( evt.target.files[0]);
            });
            // 确认上传btn
            $('#fileSubmit').click(function(){
                uploadImages();
            });
            // 拖拽选择文件区域
            var dragDrop =  $("#fileDragArea").get(0);

            dragDrop.addEventListener("dragover", function(e) {
                e.stopPropagation();
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
                $(this).addClass('upload_drag_hover');
            }, false);
            dragDrop.addEventListener("dragleave", function(e) { $(this).removeClass('upload_drag_hover'); }, false);

            dragDrop.addEventListener("drop", function(e) {
                e.stopPropagation();
                e.preventDefault();

                var files = e.dataTransfer.files;
                var output = [];
                for (var i = 0, f; f = files[i]; i++) {
                    handleFile(f);
                }
                $(this).removeClass('upload_drag_hover');
             }, false);
        }

        return this.each(function() {
            var self = $(this);
            initUI();

            initEvents();

            $(this).click(function(){

                $('.upload-widget-mask').fadeIn();
                $('.upload-widget').fadeIn();

            })
        });

    }

}));
