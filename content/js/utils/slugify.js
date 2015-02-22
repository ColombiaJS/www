define([], function(){
	'use strict';

	var colors = require('colors'),
		from = 'àáäãâèéëêìíïîòóöôõùúüûñç·/_,:;',
		to = 'aaaaaeeeeiiiiooooouuuunc------'

	return function slugify( str ){
		var i = 0,
			len = from.length
		
		str = str.toLowerCase()

		for( ; i < len; i++ ){
			str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
		}

		return str.replace(/^\s+|\s+$/g, '')
			.replace(/[^-a-zA-Z0-9\s]+/ig, '')
			.replace(/\s/gi, "-")
	}
})