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
	// Create the svg element in which we will create the map.
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
		d3.json(data, function(error, altfuelstations) {
			if (error) return console.error(error);
			console.log(altfuelstations);
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
				.datum(topojson.feature(altfuelstations,
							altfuelstations.objects.altfuelstations))
				.attr("d", projection_path)
				.attr("class", "data-point");
		});
	}
}

/*
 * Make a bar graph.
 */
function bar(data) {
	var bar_svg = d3.select("main").append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "bar-chart");

	d3.json(data, function(error, enrollment) {
		if (error) return console.error(error);
		console.log(us);
		
		d3.select(".bar-chart")
			.selectAll("div")
			.data(data)
			.enter().append("div")
			.style("width", function(d) { return d * 10 + "px"; })
			.text(function(d) { return d; });
	});
}
