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
  var currentData;

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
        if ($(this).attr('class') == "add" || $(this).attr('class') == "delete") {

        } else {
          $(this).append('<div class="hoverinfo">' + title + '</div>');
        }
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
          else if (_this.attr('class') == "add" || _this.attr('class') == "delete" ) {

          } else if (_this.attr('class') == "add active") {
            _this.removeClass("active");
            $('.delete').removeClass("active");
            insertDataPoint();
          } else if ( _this.attr('class') == "delete active") {
            deleteDataPoint();
          } else {

          }
          // Uses the var image defined above to append the correct information.

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

  /*
   * NDSU Enrollment
   *
   * This shows a bar graph of the fall enrollment of NDSU each year.
   *
   * Data Source:
   * https://www.ndsu.edu/data/enrollment/annual/
   */
  function uploadBar() {
    currentGraph = "bar";
    activateButtons();
    bg.style.visibility = 'hidden';
    d3.json("../data/ndsu_enrollment.json", function(error, data) {
      if (error) return console.error(error);
      console.log(data);
      currentData = data;
      bar(data);
    });  }

  /*
   * Alternative Fuel Stations
   *
   * This is a map of the locations of alternative fuel stations in the US. The
   * data is from data.gov and is licensed under the terms of the CC-by license.
   *
   * Data Source:
   * http://catalog.data.gov/dataset/alternative-fueling-station-locations-b550c
   */
  function uploadMap() {
    currentGraph = "map";
    activateButtons();
    bg.style.visibility = 'hidden';

    d3.json("../data/altfuelstations.json", function(error, data) {
      if (error) return console.error(error);
      console.log(data);
      currentData = data;
      map(data);
    });    }

  /*
   * NDSU Student Residency Demographics
   *
   * This shows a pie chart with the percent of where students come to NDSU from.
   *
   * Data Source:
   * https://www.ndsu.edu/data/quickfacts/
   */
  function uploadPie() {}

  /*
   * Create Data Sets
   *
   * These functions allow the user to specify data in a dialog box and
   * visualize it immediately.
   */

  // Make the dialog box for creating a bar graph.
  function barCreate() {
    activateButtons();
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
        currentData = {"data": [] };

        $('.element').each(function() {
          var inputFields = $('input', $(this));
          currentData.data.push( {"category": inputFields[0].value, "value": inputFields[1].value});
        });
        bar(currentData);
        removeDialog();
      }
    });

  }

  // Make the dialog box for creating a map.
  function mapCreate() {
    activateButtons();
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
    '<div class="closeButton"><i class="fa fa-times"></i></div>' +
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

    $('.closeButton').on({
      click: function () {
        removeDialog();
      }
    });

    $('.acceptButton').on({
      click: function() {
        alert('Creating a map is not yet implemented.');
      }
    });

    //map();
    //bg.style.visibility = 'hidden';
  }

  // newElement() adds a set of text boxes to the current create dialog box.
  function newElement() {
    baseCase.data.push({"category": "3", "value": 0});
    refreshElement();
  }

  // removeElement() removes a set of text boxes to the current create dialog box.
  function removeElement() {
    baseCase.data.pop();
    refreshElement();
  }

  // refreshElement() applies the effects of newElement() and removeElement(),
  // then makes the new dialog box in html.
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

  // removeDialog() removes the create dialog from the screen when the user
  // clicks the close button or the create! button.
  function removeDialog() {
    $('#dialogImage').remove();
    $('.elementAdd').remove();
    $('.elementAddSmall').remove();
    $('#dialogBottom').remove();
    elementNum = 0;
  }

  // activateButtons() re-enables the add and delete buttons after they have
  // been disabled.
  function activateButtons() {
    $('.add').addClass('active');
    $('.delete').addClass('active');
  }

  function deleteDataPoint() {
    d3.selectAll(".bar")
      .classed("barActive", true);
    $('.bar').on("click", function () {
      d3.select(this).classed("toDelete", true);
      var elementToDelete = -1;
      d3.selectAll('.barActive')[0].forEach(function(currentValue, index) {
        if (currentValue.classList.contains('toDelete'))
        {
          elementToDelete = index;
          return;
        }
      });
      console.log(currentData);
      currentData.data.splice(elementToDelete, 1);
      bar(currentData);

    })
  }

  function insertDataPoint() {
    $('.dialogBoxSmall').append('<div id="dialogImage">' +
    '<i class="fa fa-bar-chart"></i>' + 'Add Bar Graph Element' +
    '<div class="closeButton"><i class="fa fa-times"></i></div>' +
    '</div>' + '<div class="elementAddSmall"></div>' +
    '<div id="dialogBottom" class="acceptButton">Add!</div>');

    $('.closeButton').on({
      click: function () {
        removeDialog();
      }
    });

    if (currentGraph == 'bar') {
      $('.elementAddSmall').append('<span id="title">Title</span>' + '<input type="text" class="keyboard" placeholder="Type Something Here!"/>' + '<span id="title">Value</span>' + '<input type="text" class="keyboard" placeholder="Type Something Here!"/>');
    } else if (currentGraph == "map") {
      $(this).append('<span id="title">Long</span>' + '<input type="text" class="keyboard" placeholder="' + baseCase.data[i].category + '"/>' + '<span id="title">Lat</span>' + '<input type="text" class="keyboard" placeholder="' + baseCase.data[i].value + '"/>');
    }

    $('.acceptButton').on({
      click: function() {
        var inputFields = $('input', '.elementAddSmall');
        currentData.data.push( {"category": inputFields[0].value, "value": inputFields[1].value});

        bar(currentData);
        removeDialog();
        activateButtons();
      }
    })
  }
});
