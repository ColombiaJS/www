/**
 * Requires Flatiron/Director!
 */
define([
		'director',
		'./Mediator',
		'lodash'
	], function( 
		Router, 
		Mediator, 
		_ 
	) {
	
	var historyState = {/* define default state if needed*/},
		router,
		stringify = JSON.stringify,
		parse = JSON.parse,
		// Set to true if you want to use History PushState
		html5history = false,
		timeoutState

	function getHashObj(){
		var hash = location.hash.replace(/#(\/[a-z]+\/)?/,'').replace('%F3','\"')
		if( hash ){
			return parse( decodeURIComponent( hash ) )
		}else{
			return {}
		}
	}
	
	function handleHistoryPush( argument ){
		var strState,
			push = argument || getHashObj()

		_.assign( historyState, push )

		clearTimeout( timeoutState )
		timeoutState = setTimeout(function(){
			strState = stringify( historyState )
			_updateHistory( strState )
		}, 100)

	}

	function handleHistorySet( state ){
		var strState

		historyState = state
		strState = stringify( historyState )

		_updateHistory( strState )
	}

	function _updateHistory( strState ){
		if( html5history ){
			history.pushState(null, null, '/state/' + strState )
		}else{
			location.hash = '/state/' + strState
		}
	}

	function handleHistoryStateChange(){
		historyState = push = getHashObj()
		Mediator.trigger('history-state-change', historyState)	
	}

	// You can set state changes depending on the
	// updates via the Mediator:
	// 
	// Mediator.on('page-change', function( e, page ){
	// 	handleHistoryPush( { page: page } )
	// })

	router = Router({
			// Handling history change
			'/state/.*': handleHistoryStateChange,
			// Handling state pushing
			'/push/.*': handleHistoryPush
		})
		.configure({ html5history: html5history })
	
	router.init()
	handleHistoryPush()

	return {
		getState: function(){
			return historyState
		},
		pushState: handleHistoryPush,
		setState: handleHistorySet
	}
})