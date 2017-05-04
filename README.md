eslint-plugin-no-underscure
===================


Underscore (the character, not the library) specific linting rules



# Installation

```sh
$ npm install eslint --save-dev
$ npm install eslint-plugin-no-underscore --save-dev
```



# Configuration

Add `plugins` section and specify `no-underscore` as a plugin>

```json
{
  "plugins": [
    "no-underscore"
  ]
}
```

Enable the rule:

```json
  "rules": {
    "no-underscore/no-underscore": "warn"
  }
```


# Options

* allowConstants [bool], (ex.: API_URL)
* allowLeadingUnderscores [bool], (ex.: _myFancyLocalVariable)



Example:

```json
  "rules": {
    "no-underscore/no-underscore": ["warn", {
      "allowConstants": true
    }]
  }
```
