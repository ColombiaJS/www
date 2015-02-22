# About Widgets

As the modules, widgets work independently, they can use other modules inside,
they should extend the Widget prototype or at least expose the same API. A widget
should:

- Be independent (it's business is not from any other module concern)
- Be self scoped (it doesn't know about other widgets or parents scopes)
- Be easily loaded and used in other places
- Can contain other widgets