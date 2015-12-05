/**
 * Created by Squeelch on 11/27/2015.
 */
$(document).ready(function(){
  var uploadVisible = false;
  onHover();
  /*
   * onHover()
   *
   * Holds the functionality for the UI, activates once an option icon is hovered over.
   */
  function onHover() {
    var clicked = false;

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
        if (clicked == false) {
          if (_this.attr('id') == "create") {
            var image = '<li class="barChart" data-title="New Bar Graph">' +
              '<i class="fa fa-bar-chart"></i>' +
              '</li>' +
              '<li class="mapChart"  data-title="New Map Graph">' +
              '<i class="fa fa-map"></i>' +
              '</li>';
          } else if (_this.attr('id') == "upload") {
              var image = '';
              upload();
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
        }
          clicked = true;
      },
      mouseleave: function () {
        var hover = $(this).find(".hoverinfo");
        var click = $(this).find(".clickinfo");
        hover.removeClass("active");
        $(click).remove();
        setTimeout(function () {
          $(click).remove();
          $(hover).remove();
          clicked = false;
        }, 200);
      }
    });
  }

  /*
   * upload()
   *
   * Opens the Fuel Station Map Graph
   */
  function upload() {
    if (uploadVisible == false){
    uploadVisible = true;
    var bg = document.getElementById("background");
    bg.style.visibility = 'hidden';
    fuel_stations();
  }}
});


