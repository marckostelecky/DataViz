/**
 * Created by Squeelch on 11/27/2015.
 */
$(document).ready(function(){
  onHover();
  function onHover() {
    $(".option-icons li").on({
      mouseenter: function () {
        var title = $(this).attr('data-title');
        var _this = $(this);
        $(this).append('<div class="hoverinfo">' + title + '</div>');

        setTimeout(function () {
          _this.find(".hoverinfo").addClass("active");
        }, 50);
      },
      mouseleave: function () {
        var hover = $(this).find(".hoverinfo");
        hover.removeClass("active");
        setTimeout(function () {
          $(hover).remove();
        }, 200);
      }
    });
  }
});

