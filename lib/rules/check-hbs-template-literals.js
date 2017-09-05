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
      TemplateLiteral: (node) => {
        const hbs = node.quasis[0].value.cooked
        const results = linter.verify({source: hbs.toString(), moduleId: 'foo'})
        if (results.length !== 0) {
          const msg = `Handlebars template literal: ${results.length} error(s)`
          context.report(node, msg)
        }
      }
    }
  }
}
