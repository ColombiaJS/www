define([], function(){
	'use strict';
	
	return function toFormat( number ){
		number = (number || 0).toString()

		var splited = number.split(/[,\.]/),
			decimal = splited[1],
			len,
			separators = ['.', '\''],
			lenS = separators.length
		
		number = splited[0].split('')
		len = number.length

		for( var i = 3; i < len; i += 3 ){
			number.splice( len-i, 0, separators[ (lenS - 1) - ( ( i / 3 ) % lenS ) ] )
		}
		return number.join('') + ( decimal ? ',' + decimal.substring(0,2) : '')
	}
})