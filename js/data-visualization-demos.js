/*
 * data-visualization.js
 * Authors: Jordan Christiansen
 *
 * Here are a couple demos of the visualizations. These functions are called
 * when the user clicks the upload button in our prototype.
 */

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
 * NDSU Enrollment
 *
 * This shows a bar graph of the fall enrollment of NDSU each year.
 *
 * Data Source:
 * https://www.ndsu.edu/data/enrollment/annual/
 */
function ndsu_enrollment() {
}

/*
 * NDSU Student Residency Demographics
 *
 * This shows a pie chart with the percent of where students come to NDSU from.
 *
 * Data Source:
 * https://www.ndsu.edu/data/quickfacts/
 */
function ndsu_demographics() {
}
