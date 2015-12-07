/*
 * script.js
 * Authors: Marc Kostelecky, Jordan Christiansen
 *
 * This file contains JavaScript for our UI and other functions to connect the
 * html frontend to the d3 data visualization backend.
 */
$(document).ready(function(){
  var uploadVisible = false;
  var bg = document.getElementById("background");
  var currentGraph = null;
  var elementNum = 0;
  var baseChart;
  onHover();
  /*
   * onHover()
   *
   * Holds the functionality for the UI, activates once an option icon is hovered over.
   */
  function onHover() {
    var clicked = false;

    /*
     * Interaction functionality when using the buttons on the navbar
     * mouseenter appends a hoverinfo css
     * click is what happens when you click
     * mouseleave will remove the appended elements
     */
    $(".option-icons li").on({
      mouseenter: function () {
        var title = $(this).attr('data-title');
        var _this = $(this);
        $(this).append('<div class="hoverinfo">' + title + '</div>');

        setTimeout(function () {
          _this.find(".hoverinfo").addClass("active");
        }, 50);
      },
      /*
       * Click functionality for original Option Icons
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
            }
            else if (currentGraph == 'map') {
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
                  newElement();
                }
                else {
                  removeDialog();
                  barCreate();
                  newElement();
                }
              }
              else if (title == "New Map Graph") {
                if ($('.elementAdd').length == 0) {
                  mapCreate();
                  newElement();
                }
                else {
                  removeDialog();
                  mapCreate();
                  newElement();
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
           * Code for the upload button
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
    baseCase = {"data": [
      {"category": "0", "value": 0},
      {"category": "1", "value": 0},
      {"category": "2", "value": 0}
    ]
    };

    $('.dialogBox').append('<div id="dialogImage">' + '<div class="addButton"><i class="fa fa-plus"></i></div>' +
        '<div class="deleteButton"><i class="fa fa-minus"></i></div>' +
        '<i class="fa fa-bar-chart"></i>' + 'New Bar Graph' +
        '<div class="closeButton"><i class="fa fa-times"></i></div>' +
        '</div>' + '<div class="elementAdd"></div>' +
        '<div id="dialogBottom" class="acceptButton">Create!</div>');

    $('.addButton').on({
      click: function() {
        newElement();
      }
    });

    $('.deleteButton').on({
      click: function() {
        removeElement();
      }
    });

    $('.closeButton').on({
      click: function() {
        removeDialog();
      }
    });

    $('.acceptButton').on({
      click: function() {
        data = {"data": [] };

        $('.element').each(function() {
          var inputFields = $('input', $(this));
          data.data.push( {"category": inputFields[0].value, "value": inputFields[1].value});
        });
        console.log(data.data);
        bar(data);
      }
    });

  }
  function mapCreate() {
    currentGraph = 'map';
    baseCase = {"data": [
      {"category": "0", "value": 0},
      {"category": "1", "value": 0},
      {"category": "2", "value": 0}
    ]
    };

    $('.dialogBox').append('<div id="dialogImage">' +
        '<div class="addButton"><i class="fa fa-plus"></i></div>' +
        '<div class="deleteButton"><i class="fa fa-minus"></i></div>' +
        '<i class="fa fa-map"></i>' + 'New Map Graph' +
        '<div class="close-button"><i class="fa fa-times"></i></div>' +
        '</div>' + '<div class="elementAdd"></div>' +
        '<div id="dialogBottom" class="acceptButton">Create!</div>');

    $('.addButton').on({
      click: function () {
        newElement();
      }
    });

    $('.deleteButton').on({
      click: function () {
        removeElement();
      }
    });

    $('.close-button').on({
      click: function () {
        removeDialog();
      }
    });

    $('.acceptButton').on({
      click: function() {
        map(baseCase);
      }
    });

    //map();
    //bg.style.visibility = 'hidden';
  }

  function newElement() {
    baseCase.data.push({"category": "3", "value": 0});
    refreshElement();
  }

  function removeElement() {
    baseCase.data.pop();
    refreshElement();
  }
  function refreshElement() {
    //$('.elementAdd').append('<div class="element">' + elementNum + '</div>')
    // $('.element').attr("id", elementNum);

    d3.selectAll('.element').remove();

    d3.select('.elementAdd').selectAll('.element')
      .data(baseCase.data)
      .enter().append('div')
      .attr('id', function(d, i) { return i;})
      .attr('class', 'element');

    if (currentGraph == 'bar') {
      $('.element').each(function (i, e) {
        $(this).append('<span id="title">Title</span>' + '<input type="text" class="keyboard" placeholder="' + baseCase.data[i].category + '"/>' + '<span id="title">Value</span>' + '<input type="text" class="keyboard" placeholder="' + baseCase.data[i].value + '"/>');
      });
    } else if (currentGraph == "map") {
      $('.element').each(function (i, e) {
        $(this).append('<span id="title">Long</span>' + '<input type="text" class="keyboard" placeholder="' + baseCase.data[i].category + '"/>' + '<span id="title">Lat</span>' + '<input type="text" class="keyboard" placeholder="' + baseCase.data[i].value + '"/>');
      });
    }

    makeKeyboard();
    elementNum++;
  }

  function removeDialog() {
    $('#dialogImage').remove();
    $('.elementAdd').remove();
    $('#dialogBottom').remove();
    elementNum = 0;
  }
});
