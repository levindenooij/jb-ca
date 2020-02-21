define([
	'postmonger'
], function(
	Postmonger
) {
	'use strict';

	console.log(Postmonger);

    var connection = new Postmonger.Session();
	var tokens;
	var endpoints;
	var payload = {};

    $(window).ready(function() {
        connection.trigger('ready');
		connection.trigger('requestTokens');
		connection.trigger('requestEndpoints');
		//console.log("Ready");
    });

    connection.on('initActivity', function(data) {
    	if (data) {
    		console.log(data);
    		payload = data;
    	}
    });

	// This listens for Journey Builder to send tokens
	// Parameter is either the tokens data or an object with an
	// "error" property containing the error message
	connection.on('getTokens', function( data ) {
		if( data.error ) {
			console.error( data.error );
		} else {
			tokens = data;
		}
	});

	// This listens for Journey Builder to send endpoints
	// Parameter is either the endpoints data or an object with an
	// "error" property containing the error message
	connection.on('getEndpoints', function( data ) {
		if( data.error ) {
			console.error( data.error );
		} else {
			endpoints = data;
		}
	});

    connection.on('clickedNext', function() {
        payload['metaData'].isConfigured = true;

        connection.trigger('updateActivity', payload);
    });


		
});