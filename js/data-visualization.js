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

	// First, make the background map.
	d3.json("../data/us.json", function(error, us) {
		if (error) return console.error(error);
		console.log(us);

		// Choose a projection for the map data.
		var projection = d3.geo.albers()
			.center([0, 35])
			.rotate([100, 0])
			.parallels([25, 50])
			.translate([width / 2, height / 2]);
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
	});

	// Add the user's data to the map.
	if (data != null) {
		d3.json(data, function(error, data) {
			if (error) return console.error(error);
			console.log(data);
			// Choose a projection for the map data.
			var projection = d3.geo.albers()
				.center([0, 35])
				.rotate([100, 0])
				.parallels([25, 50])
				.translate([width / 2, height / 2]);
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
}

/*
 * Make a bar graph.
 */
function bar(data) {
	// Delete the old visualization, if there is one.
	d3.select("main svg").remove();

	// Create the svg element where we will create the bar graph.
	var bar_svg = d3.select("main").append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "bar-chart");

	var x = d3.scale.linear()
		.range([0, width]);

	var barHeight = 20

	d3.json(data, function(error, data) {
		if (error) return console.error(error);
		console.log(data);

		x.domain([0, d3.max(data.data, function(d) { return d.value; } )]);
		bar_svg.attr("height", barHeight * data.length);
		
		var bar = bar_svg.selectAll("g")
			.data(data.data)
			.enter().append("g")
			.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

		bar.append("rect")
			.attr("width", function(d) { return x(d.value); })
			.attr("height", barHeight - 1)
			.style("fill", "blue");

		bar.append("text")
			.attr("x", function(d) { return x(d.value) - 3; })
			.attr("y", barHeight / 2)
			.attr("dy", ".35em")
			.text(function(d) { return d.category; });

	});
}
