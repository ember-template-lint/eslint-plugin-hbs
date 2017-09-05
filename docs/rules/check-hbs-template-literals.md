# If you see some hbs`<h1>handlebars template</h1>`, pass it through a linter. (check-hbs-template-literals)

If you're using [ember-inline-component](https://github.com/knownasilya/ember-inline-component), you're obviously trying
to push the envelope in what Ember an do and to cut down on the number of files you're trying to deal with at any given
time. However, you may have noticed that linting in these template literals doesn't work, and if you've been using
rwjblue's [ember-template-lint](https://github.com/rwjblue/ember-template-lint), it's a pretty big sacrifice not to have
that available. Well no more! Now there's an eslint plugin for checking your inlined templates.


## Rule Details

This rule aims to provide rudimentary template-linting support for inlined templates

Examples of **incorrect** code for this rule:

```js
  layout: hbs`
    {{#if version.comment}}
      <button {{action 'openViewModal' bubbles=false}} class='icon-button' data-test={{hook 'view-comment-button'}} title={{t 'configure.service.actions.showComment'}}>
        {{fui-icon 'has-comment' class='version-details__comment has-comment'}}
      </button>
  `  
```

Examples of **correct** code for this rule:

```js
  layout: hbs`
    {{#if version.comment}}
      <button {{action 'openViewModal' bubbles=false}} class='icon-button' data-test={{hook 'view-comment-button'}} title={{t 'configure.service.actions.showComment'}}>
        {{fui-icon 'has-comment' class='version-details__comment has-comment'}}
      </button>
      {{#if isViewingVersionComment}}Version Comment {{/if}}
    {{/if}}
  `
```

### Options

This project uses configuration files for
[ember-template-lint](https://github.com/rwjblue/ember-template-lint), which
uses a `.template-lintrc.js` configuration file at the base of your project.
For example: 

```javascript
module.exports = {
  extends: 'recommended',

  rules: {
    'bare-strings': true
  }
}
```

## When Not To Use It

If you're not using inline handlebars templates

## Further Reading

 - [ember-inline-component](https://github.com/knownasilya/ember-inline-component/blob/master/README.md)
 - [ember-template-lint](https://github.com/rwjblue/ember-template-lint/blob/master/README.md)
