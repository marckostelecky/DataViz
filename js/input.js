/*
 * input.js
 * Authors: Jordan Christiansen
 *
 * This script contains the code that relates to the input of our application,
 * specifically the virtual keyboard jQuery plugin.
 */

 function makeKeyboard() {
	var myKeyboard = $('.keyboard').keyboard({
		usePreview: false,
		autoAccept: true,
		position: {
			my: 'center top',
			at: 'center bottom',
			offset: '0 20'
		}
	});
}

