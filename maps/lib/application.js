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
	 */
	draw ( room, coordinates, map, location ) {
		var options = this.options;
		PImage.decodePNGFromStream( fs.createReadStream( options.readPath + map ) ).then( ( img ) => {
			options.font.load( () => {
				var canvas = PImage.make( 1584, 1224 )
				var ctx = canvas.getContext( '2d' )
				ctx.drawImage( img, 0, 0 )
				ctx.fillStyle = 'red'
				ctx.fillRect( coordinates[0], coordinates[1], coordinates[2], coordinates[3] )
				ctx.fillStyle = 'black';
				ctx.font = "20px 'Source Sans Pro'";
				ctx.fillText( room, location[0], location[1] );
				PImage.encodePNGToStream( canvas, fs.createWriteStream( options.writePath + room + '.png' ) ).then( () => {
					console.log( 'done writing ' + room )
				} )
			} )
		} )
	}
	createMaps ( rooms ) {
		var that = this;
		Object.keys( rooms ).forEach( function ( key, index ) {
			let coordinates = rooms[key]
			let room = key
			let map = '-west.png'
			let location = [290, 76]
			if ( key.slice(3, 4) === 'P' ) {
				map = '-east.png'
				location = [175, 50]
			}
			map = key.slice( 1, 2 ) + map
			that.draw( room, coordinates, map, location )
		} )
	}
}
