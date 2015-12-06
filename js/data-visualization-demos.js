/*
 * data-visualization-demos.js
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
	map("../data/altfuelstations.json");

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
	bar("..data/ndsu_enrollment.json");
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
