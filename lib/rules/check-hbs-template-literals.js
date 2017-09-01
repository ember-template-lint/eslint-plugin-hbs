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
      category: 'Fill me in',
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ExpressionStatement: (node) => {
        const expression = node.expression
        if (expression.type === 'TaggedTemplateExpression') {
          if (expression.tag.name === 'hbs') {
            if (expression.quasi.type === 'TemplateLiteral') {
              const hbs = expression.quasi.quasis[0].value.cooked
              const results = linter.verify({source: hbs.toString(), moduleId: 'foo'})
              if (results.length !== 0) {
                let msg = `Handlebars template literal: ${results.length} error(s)`
                context.report(node, msg)
              }
            }
          }
        }
      }
    }
  }
}
