# eslint-plugin-hbs

[![Greenkeeper badge](https://badges.greenkeeper.io/psbanka/eslint-plugin-hbs.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/eslint-plugin-hbs.svg)](https://badge.fury.io/js/eslint-plugin-hbs)
[![Build Status](https://travis-ci.org/psbanka/eslint-plugin-hbs.svg?branch=master)](https://travis-ci.org/psbanka/eslint-plugin-hbs)

Provide linting for hbs template literals inside of JavaScript

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-hbs`:

```
$ npm install eslint-plugin-hbs --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-hbs` globally.

## Usage

Add `hbs` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "hbs"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
      "hbs/check-hbs-template-literals": 2
  }
}
```

or

```
  "rules": {
    'hbs/check-hbs-template-literals': [
      'error', 2,
      {'ConfigFile': __dirname + '/.eslint-template-lintrc.json'}
    ],
  }
```

The plugin will report the number of errors and the first line of the first error. Here's a running example. Left-hand side is the output of `eslint` from the command-line, right-hand side is `vim` running with `eslint` (via syntastic):


![Example of in-use](https://cl.ly/2K2y2i3g0x3d/download/Screen%20Recording%202017-09-05%20at%2011.09%20AM.gif)

## Supported Rules

* Fill in provided rules here





