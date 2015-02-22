# JavaScript Templates
Include here your JS/HTML templates and laod them using RequireJS/Text:

```
require([
	'text!templates/mytmpl.html',
	'doT'
	],
	function( templateText ){
	// Your JS using the template as String
	// it works nice with doT
	var templateFunc = doT( templateText )
	$('#elem').html( templateFunc({ message: 'hello' }) )
})
```