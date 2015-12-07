/**
 * Created by Squeelch on 11/27/2015.
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
       * Appends the buttons and hover info for the buttons on the 3rd part of the navbar
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
          else if (_this.attr('class') == "add" || _this.attr('class') == "delete" ) {
              alert('You must have an open data set in order to add an element to it!');
          } else if (_this.attr('class') == "add active" || _this.attr('class') == "delete active" ) {
            alert(':o');
          }
          else {}
          // Uses the var image defined above to append the correct information.
          $(this).append('<ul class="clickinfo">' + image + '</ul>');

          setTimeout(function () {
            _this.find(".hoverinfo").addClass("clicked");
            _this.find(".clickinfo").addClass("active");
          }, 50);

          /*
           * UI Code for the Create menu buttons
           * HAs hover and click interactions for the Create New Graph buttons
           */
          $(".create li").on({
            // code that executes on hover
            mouseenter: function () {
              var title = $(this).attr('data-title');
              var _this = $(this);
              $(this).append('<div class="hoverinfo2">' + title + '</div>');

              setTimeout(function () {
                _this.find(".hoverinfo2").addClass("active");
              }, 50);
            },
            // When the buttons are clicked they open a dialogBox for their respective graph avoiding duplicates
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
            // Removes the div when the mouse leaves the element
            mouseleave: function () {
              var hover = $(this).find(".hoverinfo2");
              hover.removeClass("active");
              setTimeout(function () {
                $(hover).remove();
              }, 200);
            }
          });

          /*
           * Code for the Upload menu buttons
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
      activateButtons();
      bg.style.visibility = 'hidden';
      fuel_stations();
    }

  // Uploads the bar graph data
  function uploadBar() {
      activateButtons();
      bg.style.visibility = 'hidden';
      ndsu_enrollment();
  }

  /*
   * Create Bar Graph
   *
   * Creates a dialogBox that allows you to set parameters that will create a bar graph
   * Uses a JSON object that holds the data entered into the text fields.
   */
  function barCreate() {
    currentGraph = 'bar';
    baseCase = {"data": [
      {"category": "0", "value": 0},
      {"category": "1", "value": 0},
      {"category": "2", "value": 0}
    ]
    };
    // Creates a dialogBox for setting up a bar graph
    $('.dialogBox').append('<div id="dialogImage">' + '<div class="addButton"><i class="fa fa-plus"></i></div>' +
    '<div class="deleteButton"><i class="fa fa-minus"></i></div>' +
    '<i class="fa fa-bar-chart"></i>' + 'New Bar Graph' +
    '<div class="close-button"><i class="fa fa-times"></i></div>' +
    '</div>' + '<div class="elementAdd"></div>' +
    '<div id="dialogBottom">Create!</div>');

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

    /*
    * mapCreate() - Creates a Map Graph
    * Same idea as barCreate(), only it creates a map graph instead
    */
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
    '<div id="dialogBottom">Create!</div>');

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

    //map();
    //bg.style.visibility = 'hidden';
  }

  // adds a new element to the json object
  function newElement() {
    baseCase.data.push({"category": "3", "value": 0});
    refreshElement();
  }
  // removes the last element of a json object
  function removeElement() {
    baseCase.data.pop();
    refreshElement();
  }
  // refreshes the json object on so that the screen shows the current data in the dialogBox windows
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

  // removes currently showing dialogBox
  function removeDialog() {
    $('#dialogImage').remove();
    $('.elementAdd').remove();
    $('#dialogBottom').remove();
    elementNum = 0;
  }

  function activateButtons() {
    $('.add').addClass('active');
    $('.delete').addClass('active');
  }
});


