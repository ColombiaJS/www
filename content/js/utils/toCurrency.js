define([ './toFormat' ], function( toFormat ){
	'use strict';
	
	return function toCurrency( number ){
		return '$' + toFormat( number )
	}
})