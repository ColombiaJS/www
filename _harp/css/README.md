# About Styles

This guide is inspired in Guthub's Styleguide of CSS: https://github.com/styleguide/css

## SCSS Style
Any $variable or @mixin that is used in more than one file should be put in globals/. Others should be put at the top of the file where they're used.
As a rule of thumb, don't nest further than 3 levels deep. If you find yourself going further, think about reorganizing your rules (either the specificity needed, or the layout of the nesting).

## Desirable use of BEM
BEM orientates the CSS to Blocks, where also de HTML and Javascript are developed in the same way.

## File Organization
In general, the CSS file organization should follow something like this:

```
styles
├── components
│   ├── comments.scss
│   └── listings.scss
├── globals
│   ├── helpers.scss
│   ├── other_helpers.scss
│   ├── responsive_helpers.scss
│   ├── variables.scss
├── plugins
│   ├── jquery.select2.css
│   └── normalize.scss
├── sections
│   ├── home.scss
│   ├── profile.scss
│   ├── about.scss
└── shared
    ├── forms.scss
    └── fonts.scss
    └── markdown.scss
```

## Practices
1. Generate one stylesheet per website.