/**
 * Created by Squeelch on 11/27/2015.
 */
$(document).ready(function(){
  var uploadVisible = false;
  var bg = document.getElementById("background");
  var currentGraph = null;
  var elementNum = 0;
  onHover();
  /*
   * onHover()
   *
   * Holds the functionality for the UI, activates once an option icon is hovered over.
   */
  function onHover() {
    var clicked = false;

    /* Interaction functionality when using the buttons on the navbar
     *  mouseenter appends a hoverinfo css
     *  click is what happens when you click
     *  mouseleave will remove the appended elements
     * */
    $(".option-icons li").on({
      mouseenter: function () {
        var title = $(this).attr('data-title');
        var _this = $(this);
        $(this).append('<div class="hoverinfo">' + title + '</div>');

        setTimeout(function () {
          _this.find(".hoverinfo").addClass("active");
        }, 50);
      },
      /* Click functionality for original Option Icons
       *
       */
      click: function() {
        var _this = $(this);
        if (clicked == false) {
          if (_this.attr('id') == "create") {
            var image = '<li class="barChart" data-title="New Bar Graph" id="bar">' +
              '<i class="fa fa-bar-chart"></i>' +
              '</li>' +
              '<li class="mapChart"  data-title="New Map Graph" id="map">' +
              '<i class="fa fa-map"></i>' +
              '</li>';
          } else if (_this.attr('id') == "upload") {
            var image = '<li class="barChart" data-title="Upload Bar Graph" id="bar">' +
              '<i class="fa fa-bar-chart"></i>' +
              '</li>' +
              '<li class="mapChart"  data-title="Upload Map Graph" id="map">' +
              '<i class="fa fa-map"></i>' +
              '</li>';
          }
          else if (_this.attr('id') == "add") {
            if (currentGraph == 'bar') {
              newElement();
            }
            else if (currentGraph == 'map') {
              newElement();
            }
            else {
              alert('You must have an open data set or be creating a data set in order to add an element to it!');
            }
          } else {

          }

          $(this).append('<ul class="clickinfo">' + image + '</ul>');

          setTimeout(function () {
            _this.find(".hoverinfo").addClass("clicked");
            _this.find(".clickinfo").addClass("active");
          }, 50);

          /*
           * Code for the Create button
           */
          $(".create li").on({
            mouseenter: function () {
              var title = $(this).attr('data-title');
              var _this = $(this);
              $(this).append('<div class="hoverinfo2">' + title + '</div>');

              setTimeout(function () {
                _this.find(".hoverinfo2").addClass("active");
              }, 50);
            },

            click: function () {
              var title = $(this).attr('data-title');
              if (title == "New Bar Graph") {
                if ($('.elementAdd').length == 0) {
                  barCreate();
                }
                else {
                  removeDialog();
                  barCreate();
                }
            }
              else if (title == "New Map Graph") {
                if ($('.elementAdd').length == 0) {
                  mapCreate();
                }
                else {
                  removeDialog();
                  mapCreate();
                }
              }
            },

            mouseleave: function () {
              var hover = $(this).find(".hoverinfo2");
              hover.removeClass("active");
              setTimeout(function () {
                $(hover).remove();
              }, 200);
            }
          });

          /*
           * Code for the Create button
           */
          $(".upload li").on({
            mouseenter: function () {
              var title = $(this).attr('data-title');
              var _this = $(this);
              $(this).append('<div class="hoverinfo2">' + title + '</div>');

              setTimeout(function () {
                _this.find(".hoverinfo2").addClass("active");
              }, 50);
            },


        click: function () {
          var title = $(this).attr('data-title');
          if (title == "Upload Bar Graph") {
            uploadBar();
          }
          else if (title == "Upload Map Graph") {
            bg.style.visibility = 'hidden';
            uploadMap();
          }
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
      // mouseleave for option icons
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
   * Upload Data Sets
   *
   * This would allow the user to upload the dataset of his or her choosing to
   * the web application, but in our prototype it imports predefined demo
   * datasets.
   *
   * The code of the demos is in js/data-visualization-demos.js.
   */

  // Uploads the fuel station map graph
  function uploadMap() {
      bg.style.visibility = 'hidden';
      fuel_stations();
    }

  // Uploads the bar graph data
  function uploadBar() {
      bg.style.visibility = 'hidden';
      ndsu_enrollment();
  }

  function barCreate() {
    currentGraph = 'bar';

    $('.dialogBox').append('<div id="dialogImage">' +
    '<i class="fa fa-bar-chart"></i>' + 'New Bar Graph' +
    '<div class="close-button"><i class="fa fa-times"></i></div>' +
    '</div>' + '<div class="elementAdd"></div>' +
    '<div id="dialogBottom">Create!</div>');

    $('.close-button').on({
      click: function () {
        removeDialog();
      }
    });

  }
  function mapCreate() {
    currentGraph = 'map';

    $('.dialogBox').append('<div id="dialogImage">' +
    '<i class="fa fa-map"></i>' + 'New Map Graph' +
    '<div class="close-button"><i class="fa fa-times"></i></div>' +
    '</div>' + '<div class="elementAdd"></div>' +
    '<div id="dialogBottom">Create!</div>');

    $('.close-button').on({
      click: function () {
        removeDialog();
      }
    });

    //map();
    //bg.style.visibility = 'hidden';
  }

  function newElement() {
    //$('.elementAdd').append('<div class="element">' + elementNum + '</div>')
   // $('.element').attr("id", elementNum);
    d3.selectAll('.elementAdd div')
      .enter().append('div')
      .attr('class', '.element');
    elementNum++;
  }

  function removeDialog() {
    $('#dialogImage').remove();
    $('.elementAdd').remove();
    $('#dialogBottom').remove();
    elementNum = 0;
  }
});


