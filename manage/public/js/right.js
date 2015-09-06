$(function () {
    //click event
    var x, y, mx, my, $drag;
    $(document).click(function(){
        $('#menu').fadeOut();
        // $('.content-menus .to-edit').off('click');
    });
    $(document).on('mousedown', '#pic div', function (mouse) {
      mx = mouse.clientX;
      my = mouse.clientY;
      x = mx - $(this).offset().left;
      y = my - $(this).offset().top;
      if(3 == mouse.which) {
          var that = this;
          $('#menu').css({'left': mx - 20, 'top': my - 20}).fadeIn();
          // var img = $('<img/>').attr('src', $(this).data('src'));
          $('#menu .to-edit').on('click', function(){
              localStorage.setItem('src', $(that).data('src'));
              location.href = "/?type=edit";
          });
          return false;
      }
      $drag = $(this).clone();
      $drag.addClass('draggable');
      $drag.appendTo($('#pic'));
      $(this).addClass('dragged');
      $drag.css({
          'top' : my - y,
          'left': mx - x
      });
    });
    $(document).on('mousemove', '#pic', function (mouse) {
        mx = mouse.clientX;
        my = mouse.clientY;
        var $divs = $('#pic div');
        if ($divs.hasClass('draggable')) {
            for (var  i = 0; i < $divs.length; i++) {
                var tmp = $divs[i];
                if (!$(tmp).hasClass('draggable')) {
                    if (isContain($drag, $(tmp))) {
                        $('.droppable').removeClass('droppable');
                        $(tmp).addClass('droppable');
                    }
                }
            }
            $drag.css({
                'top' : my - y,
                'left': mx - x
            });
        }
    });
    $(document).on('mouseup', '#pic', function (mouse) {
        var $divs = $('#pic div');
        for (var  i = 0; i < $divs.length; i++) {
            var tmp = $divs[i];
            if ($(tmp).hasClass('draggable')) {
                continue;
            }
            if ($(tmp).hasClass('droppable')) {
                $(tmp).next().before($drag);
                $drag.removeClass('draggable');
                $('.dragged').next().before($(tmp));
                $(tmp).removeClass('droppable');
                $('.dragged').remove();
            }
        }
    })
})
