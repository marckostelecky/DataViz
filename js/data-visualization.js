/*
 * Alternative Fuel Stations
 *
 * This is a map of the locations of alternative fuel stations in the US. The
 * data is from data.gov and is licensed under the terms of the CC-by license.
 *
 * Source:
 * http://catalog.data.gov/dataset/alternative-fueling-station-locations-b550c
 */
function fuel_stations() {
	// First, display the map.
	map();
}

/*
 * Display the map using data from naturalearthdata.com.
 */
function map() {
	// This is the width and height of the map area.
	var width = 960,
	    height = 1160;

	// Create the svg element in which we will create the map.
	var svg = d3.select("main").append("svg")
		.attr("width", width)
		.attr("height", height);

	d3.json("../data/us.json", function(error, us) {
		if (error) return console.error(error);
		console.log(us);

		// Read in the map data.
		var units = topojson.feature(us, us.objects.units);
		// Choose a projection for the map data.
		var projection = d3.geo.albers()
			.center([0, 38])
			.rotate([100, 0])
			.parallels([25, 50])
			.translate([width / 2, height / 2]);
		// Generate the svg path from the data.
		var path = d3.geo.path().projection(projection);

		svg.append("path")
			.datum(units)
			.attr("d", path)
			.attr("id", "map");
		svg.append("path")
			.datum(topojson.mesh(us, us.objects.units, function(a, b) { return a !== b; }))
			.attr("d", path)
			.attr("class", "state-boundary");
	});
}
