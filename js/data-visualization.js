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
 * Alternative Fuel Stations
 *
 * This is a map of the locations of alternative fuel stations in the US. The
 * data is from data.gov and is licensed under the terms of the CC-by license.
 *
 * Data Source:
 * http://catalog.data.gov/dataset/alternative-fueling-station-locations-b550c
 */
function fuel_stations() {
	// First, display the map.
	map();

	d3.json("../data/altfuelstations.json", function(error, altfuelstations) {
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

/*
 * Display the map using data from naturalearthdata.com.
 *
 * Data Sources:
 * http://naciscdn.org/naturalearth/10m/cultural/ne_10m_admin_1_states_provinces.zip
 * http://naciscdn.org/naturalearth/10m/cultural/ne_10m_populated_places.zip
 */
function map() {
	// Create the svg element in which we will create the map.
	var map_svg = d3.select("main").append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "map");

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
}
