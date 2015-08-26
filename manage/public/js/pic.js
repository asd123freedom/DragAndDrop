function isContain(first, second) {
    var centerX = $(first).offset().left + $(first).width() / 2;
    var centerY = $(first).offset().top + $(first).height() / 2;
    var borderX = $(second).offset().left + $(second).width();
    var borderY = $(second).offset().top + $(second).height();
    if (centerX > $(second).offset().left
        && centerX < borderX
        && centerY > $(second).offset().top
        && centerY < borderY) {
        return true;
    }
    else {
        return false;
    }
}
$(document).ready(function() {
  var x, y, mx, my, lastItem, firstItem;

  //click event
  $(document).on("mousedown", "#list .item", function (mouse) {
    mx = mouse.clientX;
    my = mouse.clientY;
    x = mx - $(this).offset().left;
    y = my - $(this).offset().top;

    var width = $(this).width();
    var height = $(this).height();
    firstItem = $(".item:first").offset().top + ($(".item:first").height() / 2);
    $(this).css({ "width" : width, "height" : height });
    $(this).after("<li id='place-holder'></li>");
    $("#place-holder").css({ "height" : $(this).height() });
    $(this).addClass("draggable");
    $(this).css({
        top: $("#place-holder").offset().top
    });
  });
  //drag event
  $(document).on("mousemove", "#box", function (mouse) {
    var holdPlace = $("#place-holder");
    if($(".item").hasClass("draggable")) {
      mx = mouse.clientX;
      my = mouse.clientY;
      $(this).find('li.item').css({
          cursor: 'move'
      });
      var item = $(".item");

      for (var i = 0; i < item.length; i++) {
          if(!$(item[i]).hasClass("draggable")) {
            var _height = $(".draggable").height();
            var dragBottom = $(".draggable").offset().top + _height;
            var noDrag = $(item[i]).offset().top + ($(item[i]).height() / 2);
            // firstItem是指第一个item的高度
            // dragTop是指拖动元素的下边缘
            if (dragBottom - _height < firstItem) {

                // $("#place-holder").remove();
                $(".item:first").before(holdPlace);
            }

            if (dragBottom > noDrag) {
                // console.log(i + ':' + noDrag + '--' + dragBottom);
                // $("#place-holder").remove();
                $(item[i]).after(holdPlace);
            }
          }
      }

      $(".draggable").css({ "top" : my - y});
    }
  });

  //mouse release event
    $(document).on("mouseup", '#box li' ,function (mouse) {
        if (mx === mouse.clientX && my === mouse.clientY) {
            $(this).trigger('click');
        }
        if ($(".item").hasClass("draggable")) {
          deselect();
        }
        var toPlace = $(".draggable");
        $(".draggable").remove();
        $(document).find("#place-holder").after(toPlace).remove();
        $(".item").attr("style", "").removeClass("draggable");
        $('#box li.item').css({
            cursor: 'pointer'
        });
    });
  function deselect() {
    if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
        window.getSelection().empty();
      }
      else if (window.getSelection().removeAllRanges) {  // Firefox
        window.getSelection().removeAllRanges();
      }
    }
    else if (document.selection) {  // IE?
      document.selection.empty();
    }
  }
});
