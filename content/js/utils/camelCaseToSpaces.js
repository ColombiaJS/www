define([], function(){
	'use strict';

	return function camelCaseToSpaces( str ){
		return str.replace( rex, '$1$4 $2$3$5' )
	}
})