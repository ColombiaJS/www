define([
		'./Observable',
		'lodash'
	], function(
		Observable,
		_
	){
	var proto
	
	function Model(){
		this._model = {}
	}

	Model.prototype = new Observable()
	proto = Model.prototype

	proto.set =  function( prop, value ){
		var actual = this.get( prop )
		if( !_.isEqual( value, actual ) ){
			this._model[ prop ] = value
			this.trigger('model-change', { property: prop, value: value })
			this.trigger('model-change:' + prop, value )
		}
	}

	proto.get = function( prop ){
		return _.clone( this._model[ prop ], true )
	}

	return Model
})