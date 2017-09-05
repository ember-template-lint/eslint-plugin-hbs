/**
 * @fileoverview If you see some hbs`&lt;h1&gt;handlebars templates&lt;/h1&gt;`, pass it through a linter.
 * @author Peter Banka
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/check-hbs-template-literals'),
  RuleTester = require('eslint').RuleTester

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
})
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run('check-hbs-template-literals', rule, {
  valid: [
    'hbs`<h1>heading</h1>`',
    `hbs\`
      {{#fui-graph
        data=model.data
        dataItemCount=model.dataItemCount
        globalMeasurement=model.globalMeasurement
        key='hitRatio'
        metric='hit_ratio'
        unit='percent' as |metadata mean|}}thing{{/fui-graph}}\``,
    'hbs`{{#if foo}}<h1>Foo!</h1>{{else}}<h1>not foo</h1>{{/if}}`'
  ],

  invalid: [
    {
      code: 'hbs`{{does not pass linting`',
      errors: [
        {
          message: 'Handlebars template literal: 1 error(s)',
          type: 'TemplateLiteral'
        }
      ]
    }
  ]
})
