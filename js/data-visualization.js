/*
 * data-visualization.js
 * Created: 2 December 2015
 * Authors: Jordan Christiansen
 *
 * This is where our data visualization code is. This is where we primarily
 * work with d3 (d3js.org).
 */

// This is the width and height of the visualization area.
var width = 1024;
var height = 786;

/*
 * Display a US map using data from naturalearthdata.com.
 *
 * Data Sources:
 * http://naciscdn.org/naturalearth/10m/cultural/ne_10m_admin_1_states_provinces.zip
 * http://naciscdn.org/naturalearth/10m/cultural/ne_10m_populated_places.zip
 */
function map(data) {
  // Delete the old visualization, if there is one.
  d3.select("main svg").remove();

  // Create the svg element where we will create the map.
  var map_svg = d3.select("main").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "map");

  // Choose a projection for the map data.
  var projection = d3.geo.albers()
    .center([0, 35])
    .rotate([100, 0])
    .parallels([25, 50])
    .translate([width / 2, height / 2]);

  // First, make the background map.
  d3.json("../data/us.json", function(error, us) {
    if (error) return console.error(error);
    console.log(us);

    // Generate the svg path from the data.
    var projection_path = d3.geo.path().projection(projection);
    projection_path.pointRadius(1);

    // Draw the states.
    map_svg.append("path")
      .datum(topojson.feature(us, us.objects.units))
      .attr("d", projection_path)
      .attr("id", "map");
    // Draw the state boundaries.
    map_svg.append("path")
      .datum(topojson.mesh(us, us.objects.units, function(a, b) { return a !== b; }))
      .attr("d", projection_path)
      .attr("class", "state-boundary");
    // Add points for major cities.
    map_svg.append("path")
      .datum(topojson.feature(us, us.objects.places))
      .attr("d", projection_path)
      .attr("class", "place");

    // Add the user's data to the map.
    // Generate the svg path from the data.
    var projection_path = d3.geo.path().projection(projection);
    projection_path.pointRadius(1);

    // Add the data to the map.
    map_svg = d3.select(".map");
    map_svg.append("path")
      .datum(topojson.feature(data,
            data.objects.dataPoints))
      .attr("d", projection_path)
      .attr("class", "data-point");
  });
}

/*
 * Make a bar graph.
 */
function bar(barData) {
  // Delete the old visualization, if there is one.
  d3.select("main svg").remove();

  // Create the svg element where we will create the bar graph.
  var barSvg = d3.select("main").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("padding", "100px 100px 100px 100px")
    .attr("class", "barChart");

  // Set the dimentions and attributes of the bar chart.
  var chartWidth = 800;
  var chartHeight = 600;

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, chartWidth], .1);
  var y = d3.scale.linear()
    .range([chartHeight/2, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  // Plot the data.
  x.domain(barData.data.map(function(d) { return d.category; }));
  y.domain([0, d3.max(barData.data, function(d) { return d.value; } )]);
  var barWidth = chartWidth / barData.data.length;

  barSvg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0, " + chartHeight + ")")
    .call(xAxis);

  barSvg.selectAll(".bar")
    .data(barData.data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.category); })
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return chartHeight - y(d.value); })
    .attr("width", x.rangeBand());
}
