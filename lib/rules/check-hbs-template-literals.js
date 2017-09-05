/**
 * @fileoverview If you see some hbs`<h1>handlebars templates</h1>`, pass it through a linter.
 * @author Peter Banka
 */
'use strict'
const TemplateLinter = require('ember-template-lint')
const linter = new TemplateLinter()

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
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      TaggedTemplateExpression: (node) => {
        if (node.tag.name === 'hbs') {
          if (node.quasi.type === 'TemplateLiteral') {
            const hbs = node.quasi.quasis[0].value.cooked
            const results = linter.verify({source: hbs.toString(), moduleId: context.id})
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
