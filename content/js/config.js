var require = {
	baseUrl: '/content/js/',
	paths: {
		/*
		<!-- bower:js -->
		<!-- endbower -->
		*/
		
		'director': '../components/director/build/director.min',
		
		'doT': '../components/doT/doT.min',
		'fastclick': '../components/fastclick/lib/fastclick',
		'jQuery': '../components/jquery/dist/jquery',
		
		'lodash' : '../components/lodash/dist/lodash.min',
		'text': '../components/requirejs-text/text'
	},
	shim: {
		'jQuery': {
			exports: 'jQuery'
		},
		'director': {
			exports: 'Router'
		},
		'fastclick': {
			exports: 'FastClick'
		}
	}
}

if( typeof exports === 'object' ) {
	exports.config = require
}