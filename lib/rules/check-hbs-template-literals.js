/**
 * @fileoverview If you see some hbs`<h1>handlebars templates</h1>`, pass it through a linter.
 * @author Peter Banka
 */
'use strict'
const fs = require('fs')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {

  meta: {
    docs: {
      description:
        'If you see some hbs`<h1>handlebars templates</h1>`, pass it through a linter.',
      category: 'Literal linting',
      recommended: false
    },
    fixable: null,
    schema: [
      {
        oneOf: [
          {
            enum: ['tab']
          },
          {
            type: 'integer',
            minimum: 0
          }
        ]
      },
      {
        type: 'object',
        properties: {
          'ConfigFile': {
            type: 'string'
          },
        },
        additionalProperties: false,
      },
    ]
  },

  create: function(context) {
    let config = {}
    let linter
    let TemplateLinter
    try {
      TemplateLinter = require('ember-template-lint')
    } catch(e) {
      console.error('Could not import ember-template-lint. Please make sure that this is a dependency in your project')
      process.exit(1)
    }
    if (context.options.length > 1) {
      const extendedOptions = context.options[1]
      const filename = extendedOptions.ConfigFile
      if (filename && fs.existsSync(filename)) {
        config = require(filename)
        linter = new TemplateLinter({config})
      }
    }
    if (!linter) {
      linter = new TemplateLinter()
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      TaggedTemplateExpression: (node) => {
        if (node.tag.name === 'hbs') {
          if (node.quasi.type === 'TemplateLiteral') {
            let hbs = node.quasi.quasis[0].value.cooked
            hbs = unindentAndStripSafeNewlines(hbs)
            const results = linter.verify({source: hbs.toString(), filePath: context.id, moduleId: context.id})
            if (results.length !== 0) {
              const firstLine = results[0].message.split('\n')[0]
              const msg = `${results.length} error(s): ${firstLine}`
              context.report(node, msg)
            }
          }
        }
      },
    }
  }
}

/*
This turns:

```js
`
    {{#foo-bar}}
      template block text
    {{/foo-bar}}
  `
```js

into:

```js
`{{#foo-bar}}
  template block text
{{/foo-bar}}`
```js

so your indentation, whitespace, and newline rules don't fail on every template.
*/
function unindentAndStripSafeNewlines(template) {
  let lines = template.split('\n')

  // you are allowed one initial blank line, we remove it for you
  if (lines[0] === '') {
    lines = lines.slice(1)
  }

  let countSame = -1
  let testChar
  do {
    countSame++
    testChar = null
    for (let line of lines) {
      if (!testChar) {
        testChar = line[countSame]
      }
      let curChar = line[countSame]
      let isBlankLine = !curChar
      let isWhitespace = curChar === ' ' || curChar === '\t'
      if (!isBlankLine && (!isWhitespace || curChar !== testChar)) {
        testChar = null
        break
      }
    }
  } while (testChar)

  lines = lines.map(line => {
    return line.substr(countSame)
  })

  // after we are done un-indenting, we will remove one final blank line for you
  if (lines[lines.length - 1] === '') {
    lines = lines.slice(0, lines.length - 1)
  }

  return lines.join('\n')
}
