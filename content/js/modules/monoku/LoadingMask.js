define([
		'jQuery'
	], function(  
	){
	var loadElem = $('<div class="loading-facade"></div>')
 
	function loading( elem, promise ){
		var nload = loadElem.clone(),
			$elem = $(elem)
		nload.css({
			top: $elem.offset().top,
			left: $elem.offset().left,
			width: $elem[0].offsetWidth,
			height: $elem[0].offsetHeight
		})
		nload.appendTo(document.body)
 
		promise.always( removeLoading( nload ) )
	}
 
	function removeLoading(loader ){
		return function(){
			loader.fadeOut( function(){
				loader.remove()
			})
		}
	}
 
	return {
		loading: loading
	}
})