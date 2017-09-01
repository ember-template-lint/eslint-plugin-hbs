# eslint-plugin-hbs

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
        "hbs/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





