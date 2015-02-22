define([
		'jQuery'
	],
	function(){
	var events = {
			all: []
		}

	return {
		/**
		 * Adds an observer
		 * @param  {String}   	evt      	event name
		 * @param  {Function} 	callback 	calback function
		 * @param  {Object}		context		the referenced this
		 * @return {Observable} this
		 */
		on: function( evt, callback, context ){
			evt = evt || 'all'

			if( !( evt in events ) ){
				events[ evt ] = []
			}
			events[ evt ].push({ 
					cb: callback, 
					ctx: context 
				})

			return this
		},

		/**
		 * Removes an observer (callback) from
		 * the specified event list
		 * @param  {String}   	evt      	event name
		 * @param  {Function} 	callback 	calback function
		 * @param  {Object}		context		the referenced this
		 * @return {Observable} this
		 */
		off: function( evt, callback, context ){
			var callbacks, i, tuple

			evt = evt || 'all'
			
			callbacks = events[ evt ]

			if( !callbacks ) return this

			for( i = callbacks.length; i--; ){
				tuple = callbacks[i]
				if( tuple.cb == callback && tuple.ctx == context ){
					callbacks.splice( i, 1 )
					return this
				}
			}

			return this
		},

		/**
		 * Fires the event. Callable with any numer of arguments,
		 * but first the event name
		 * @param  {String} evt the event name
		 */
		trigger: function( evt ){		
			var callbacks = events[ evt ],
				i, tupple

			if( callbacks ) for( i = callbacks.length; i--; ){
				// try{
					tuple = callbacks[i]
					tuple.cb.apply( tuple.ctx, arguments )
				// }catch(e){
					// console.error( 'Error executing callback: ' +
						// '(' + tuple.cb.name + ')' + 
						// e.message )
				// }
			}

			// Those subscribed to all events shall be notified
			// allways
			if( evt != 'all' ){
				callbacks = events[ 'all' ]
				for( i = callbacks.length; i--; ){
					// try{
						tuple = callbacks[i]
						tuple.cb.apply( tuple.ctx, arguments )
					// }catch(e){
						// console.error( 'Error executing callback: ' +
						// 	'(' + tuple.cb.name + ')' + 
						// 	e.message )
					// }
				}
			}
			return this
		}
	}
})