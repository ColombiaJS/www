define([
		'modules/monoku/Observable',
		'doT',
		'jQuery'
	],
	function(
		Observable,
		doT
	){

	function PaginatorNumber( data ){
		data = data || {}
		
		this.$element = $('.paginator')
		this.actualPage = data.actualPage || 1
		this.totalPages = data.totalPages || 1
		this.pagNumberTempl = doT.compile('<li data-page="{{=it.page}}" class="{{=it.active}}"><a href="#">{{=it.page}}</a></li>')

		this.$element.on( 'click', 'a', this.pageClick.bind(this) )
		// this.drawItems()
	}

	PaginatorNumber.prototype = new Observable()

	PaginatorNumber.prototype.previous = function(){
		this.goToPage( this.actualPage > 1 ? this.actualPage - 1 : 1 )
	}

	PaginatorNumber.prototype.next = function(){
		this.goToPage( this.actualPage < this.totalPages ? this.actualPage + 1 : this.totalPages )
	}

	PaginatorNumber.prototype.goToPage = function( numPage ){
		this.actualPage = numPage
		this.drawItems()
		this.trigger('page-change', numPage)
	}

	PaginatorNumber.prototype.getActualPage = function(){
		return this.actualPage
	}

	PaginatorNumber.prototype.getTotalPages = function(){
		return this.totalPages
	}

	PaginatorNumber.prototype.drawItems = function(){
		var firstBreakLimit = 11,
			edgeBreak = 7,
			HTMLStr,
			actual = this.actualPage,
			total = this.totalPages,
			i

		HTMLStr = '<li class="paginator__prev"><a href="#"></a></li> '
		
		if( total <= 1 ){
			this.$element.empty()
			return;
		}

		if( total < firstBreakLimit ){
			for( i = 1; i <= total; i++) HTMLStr += this.pagNumberTempl({page: i, active: actual == i ? 'active' : ''})
		}else{
			if( actual < edgeBreak - 1 ){
				for( i = 1; i <= edgeBreak; i++) HTMLStr += this.pagNumberTempl({page: i, active: actual == i ? 'active' : ''})
				HTMLStr += ' ... '
				for( i = total-1; i <=total; i++) HTMLStr += this.pagNumberTempl({page: i, active: ''})
			}else if( actual > total - edgeBreak + 2 ){
				for( i = 1; i <= 2; i++) HTMLStr += this.pagNumberTempl({page: i, active: ''})
				HTMLStr += ' ... '
				for( i = total - edgeBreak + 1; i <=total; i++) HTMLStr += this.pagNumberTempl({page: i, active: actual == i ? 'active' : ''})
			}else{
				for( i = 1; i <= 2; i++) HTMLStr += this.pagNumberTempl({page: i, active: ''})
				HTMLStr += ' ... '
				for( i = actual - 2; i <= actual + 2; i++) HTMLStr += this.pagNumberTempl({page: i, active: actual == i ? 'active' : ''})
				HTMLStr += ' ... '
				for( i = total-1; i <=total; i++) HTMLStr += this.pagNumberTempl({page: i, active: ''})

			}
		}

		HTMLStr += ' <li class="paginator__next"><a href="#"></a></li>'
		this.$element.html(HTMLStr)
	}

	PaginatorNumber.prototype.pageClick = function( e ){
		var $el = $( e.target )

		if( $el.parent().hasClass('paginator__next') ){
			this.next()
		}else if( $el.parent().hasClass('paginator__prev') ){
			this.previous()
		}else{
			this.goToPage( parseInt( $el.text() ) )
		}

		return false
	}

	PaginatorNumber.prototype.update = function( actual, total ){
		this.actualPage = actual || this.actualPage
		this.totalPages = total || this.totalPages
		this.drawItems()
	}

	return new PaginatorNumber()
})		