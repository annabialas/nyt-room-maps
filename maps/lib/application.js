/*!
 * nyt maps
 */
'use strict'

/**
 * Module dependencies
 * @private
 */
const PImage = require( 'pureimage' ) // https://www.npmjs.com/package/pureimage
const fs = require( 'fs' )

/**
 * Expose class
 */
const CreateApplication = exports = module.exports = class {
	/**
	 * Create maps constructor
	 */
	constructor () {
		this.options = this.defaultConfiguration()
		this.createMaps( this.options.rooms )
	}
	/**
	 * Configure options
	 *
	 * @return {Object} formatted options
	 */
	defaultConfiguration () {
		let options = {}
		options.font = PImage.registerFont( '../fonts/SourceSansPro-Regular.ttf', 'Source Sans Pro' )
		options.rooms = require( '../../server/data/rooms.json' )
		options.readPath = '../images/'
		options.writePath = '../server/public/images/'
		return options
	}
	/**
	 * Draw the maps
	 *
	 * @param {String} room – the name of the room
	 * @param {Array} coordinates - the [x, y, l, w] coordinates
	 * @param {String} map - the map floor image corresponding to the room
	 * @param {String} location - where to add the text name of the room
	 * @param {String} size - the size of the canvas to draw (changes based on handdrawn maps)
	 */
	draw ( room, coordinates, map, location, size ) {
		var options = this.options;
		// Load map image
		PImage.decodePNGFromStream( fs.createReadStream( options.readPath + map ) ).then( ( img ) => {
			// Load font
			options.font.load( () => {
				// Create a canvas
				var canvas = PImage.make( size[0], size[1] )
				var ctx = canvas.getContext( '2d' )
				// Draw map image onto canvas
				ctx.drawImage( img, 0, 0 )
				// Create room
				ctx.fillStyle = 'red'
				ctx.fillRect( coordinates[0], coordinates[1], coordinates[2], coordinates[3] )
				// Add room name
				ctx.fillStyle = 'black';
				ctx.font = "20px 'Source Sans Pro'";
				ctx.fillText( room, location[0], location[1] );
				// Save map
				PImage.encodePNGToStream( canvas, fs.createWriteStream( options.writePath + room + '.png' ) ).then( () => {
					console.log( 'done writing ' + room )
				} )
			} )
		} )
	}
	/**
	 * Create maps
	 *
	 * @param {Object} room — the json list of rooms to create
	 */
	createMaps ( rooms ) {
		var that = this;
		// Loop through rooms
		Object.keys( rooms ).forEach( function ( key, index ) {
			// Get the coordinates for the current room
			let coordinates = rooms[key]
			// Get the room name
			let room = key
			// Set default map and text location
			let size = [1584, 1224]
			let map = '-west.png'
			let location = [290, 76]
			// Change map and text location for Podium rooms
			if ( key.slice( 3, 4 ) === 'P' ) {
				map = '-east.png'
				location = [175, 50]
			}
			// Change size based on floors
			let floor = parseInt( key.slice( 0, 2 ) )
			if ( floor > 4 ) {
				size = [2550, 1650]
				location [2170, 1158]
			}
			// Add full image map name
			map = key.slice( 1, 2 ) + map
			if ( floor === 12) {
				map = '12-west.png'
			}
			// Draw rooms
			that.draw( room, coordinates, map, location, size )
		} )
	}
}
