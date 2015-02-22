define([
		'./Widget',
		'jQuery',
		'select2'
	],
	function(
		Widget
	){

	/**
	 * The paginator filters
	 * @param {[type]} data [description]
	 */
	function PaginatorFilter( data ){
		var self = this

		this.element = data.element;
		this.$element = $(this.element)
			.select2({
				placeholder: data.placeholder,
				minimumResultsForSearch: -1 
			})
			.change(function( e ){
				self.trigger('filter-selected', e.val)
			})
	}

	PaginatorFilter.prototype = new Widget()

	PaginatorFilter.prototype.getName = function(){
		return this.element.name
	}
	PaginatorFilter.prototype.getOption = function(){
		return this.$element.select2('val')
	}
	PaginatorFilter.prototype.setOption = function( value ){
		this.$element.select2('val', value)
		return this
	}
	PaginatorFilter.prototype.getElement = function( value ){
		return this.$element
	}
	PaginatorFilter.prototype.show = function( value ){
		return this.$element.select2("container").show()
	}
	PaginatorFilter.prototype.hide = function( value ){
		return this.$element.select2("container").hide()
	}

	/**
	 * Add trigger cada evento dispara un Paginator filter
	 */
	return PaginatorFilter
})