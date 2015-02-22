define([
		'modules/monoku/Observable'
	],
	function(
		Observable
	){
	
	function Widget(){}

	Widget.prototype = new Observable()
	
		/**
		 * Initializes the widget
		 * @param  {Object} config
		 * @return
		 */
	Widget.prototype.initialize = function( config ){
		this.template = this.template || function(){ return '' }
		this.element = this.element || config.element
		this.element.innerHTML = this.template( config.data )
		return this
	}

	/**
	 * Remove the node
	 */
	Widget.prototype.remove = function(element){
		var parent = this.element.parentNode
		if( parent )
			parent.removeChild( this.element )
		return this.element

	}

	Widget.prototype.destroy = function(element){
		this.remove()
		this.element = null
		return this
	}

	Widget.prototype.appendTo = function( root, element ){
		root.appendChild( this.element )
		return this.element
	}

	Widget.prototype.getElement = function(){
		return this.element
	}

	return Widget
})