define([], function(){
	'use strict';
	
	return function truncateWords( str, numWords){
		var truncated = '', splited

		if( !str ) return ''

		splited = str.split( /\s/ )

		if( splited.length > numWords ){
			return  ( splited.slice( 0, numWords ).join(' ')).replace('[\.,]$', '') + '...' 
		}

		return str
	}
})