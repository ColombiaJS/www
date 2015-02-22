define([
		'./slugify',
		'./truncateWords',
		'./camelCaseToSpaces',
		'./toFormat',
		'./toCurrency',
		'./consolePatch'
	],function(
		slugify,
		truncatewords,
		camelCaseToSpaces,
		toFormat,
		toCurrency
	){
	'use strict';
		
	return {
		slugify: slugify,
		truncatewords: truncateWords,
		camelCaseToSpaces: camelCaseToSpaces,
		toFormat: toFormat,
		toCurrency: toCurrency
	}
})