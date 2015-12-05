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

      click: function() {
        var _this = $(this);
        if (_this.attr('id') == "create") {
          var image = '<li class="barChart" data-title="New Bar Graph">' +
            '<i class="fa fa-bar-chart"></i>' +
            '</li>' +
            '<li class="mapChart"  data-title="New Map Graph">' +
            '<i class="fa fa-map"></i>' +
            '</li>';
        } else {
          var image = '';
        }

        $(this).append('<ul class="clickinfo">' + image + '</ul>');

        setTimeout(function () {
          _this.find(".hoverinfo").addClass("clicked");
          _this.find(".clickinfo").addClass("active");
        }, 50);

        $(".create li").on({
          mouseenter: function () {
            var title = $(this).attr('data-title');
            var _this = $(this);
            $(this).append('<div class="hoverinfo2">' + title + '</div>');

            setTimeout(function () {
              _this.find(".hoverinfo2").addClass("active");
            }, 50);
          },
          mouseleave: function () {
            var hover = $(this).find(".hoverinfo2");
            hover.removeClass("active");
            setTimeout(function () {
              $(hover).remove();
            }, 200);
          }
        });
  },
      mouseleave: function () {
        var hover = $(this).find(".hoverinfo");
        var click = $(this).find(".clickinfo");
        hover.removeClass("active");
        $(click).remove();
        setTimeout(function () {
          $(click).remove();
          $(hover).remove();
        }, 200);
      }
    });


  }
});


