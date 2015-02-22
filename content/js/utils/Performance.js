define(function() {
	'use strict'
	var hasPerf = 'performance' in window && 'mark' in window.performance,
		allowPerf = hasPerf && 'localStorage' in window && localStorage.DEBUGGER

	// Dirty, I know
	if( allowPerf ){
		performance.__registeredkeys__ = {}
		performance.__getalltimes__ = getAllTimes
		performance.__logalltimes__ = logAllTimes
		performance.__sumtimes__ = sumTimes
	}

	function time( name ){
		if( allowPerf ){
			performance.__registeredkeys__[ name ] = true
			performance.mark( name )
		}
	}

	function timeEnd( name ){
		if( allowPerf ){
			performance.mark( name + '-end' )
			performance.measure( name, name, name + '-end' )
		}
	}

	function getAllTimes(){
		var measures = performance.getEntriesByType('measure')
		return measures
		// for( var key in performance.__registeredkeys__ ){
		// }
	}

	function logAllTimes( unsorted, all ){
		var measures =  performance.getEntriesByType('measure'),
			max = typeof all == 'number' ? all : 20,
			len

		len = all ? measures.length : ( measures.length < max ? measures.length : max)

		if( !unsorted ) measures.sort( function( m1, m2 ){ return m2.duration - m1.duration  } )
		for(var i=0; i<len; i++){
			console.log(i+'. ' + (measures[i].duration/1000).toFixed(3) + 's', measures[i].name )
		}
		// for( var key in performance.__registeredkeys__ ){
		// }
	}

	function sumTimes( name ){
		return this.getEntriesByType('measure')
			.filter(function(m){return m.name === name})
			.reduce(function(a,b,c){ 
				return { duration: a.duration + b.duration}
			},{duration: 0})
			.duration
	}
	
	return {
		start: function( name ){
			time( name )
		},
		end: function( name ){
			timeEnd( name )
		}
	}
})