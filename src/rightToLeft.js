$(function () {
    var mx, my, x, y, temp;
    $(document).on('mousemove', function (mouse) {
        mx = mouse.clientX;
        my = mouse.clientY;
        var obj = $('#pic').find('.draggable');
        // x = mx - $(obj).offset().left;
        // y = my - $(obj).offset().top;
        var border = $('#box').offset().left + $('#box').width();
        if (obj && obj.length) {
            x = mx - $(obj).offset().left;
            y = my - $(obj).offset().top;
            if (mx <= border) {
                obj.hide();
                $('#small').show().css({
                    left: mx - 5,
                    top: my - 5,
                });
                temp = $('#pic .droppable').removeClass('droppable');
                $('#list li.item').each(function (index, ele) {
                    if (isContain($('#small'), ele)) {
                        $('#list li.item').removeClass('active');
                        $(ele).addClass('active');
                        // console.log('drop!' + index);
                    }
                });
            }
            else {
                $('#small').hide();
                obj.css({
                    top: my - y,
                    left: mx - x,
                    display: 'inline-block'
                });
                if (temp) {
                    temp.addClass('droppable');
                }

            }
        }
    });
    $(document).on('mouseup', function() {
        if ($('#small').css('display') !== 'none') {
            $('#list li.item').each(function (index, ele) {
                if ($(ele).hasClass('active')) {
                    $('#small').hide();
                    $('#pic .dragged').removeClass('dragged');
                    $('.draggable').remove();
                    console.log('DROP');
                    $(ele).removeClass('active');
                }
            });
        }
    });
});
