'use strict';

const rule = require('./index').rules['no-underscore'];
const RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    }
});

const ruleTester = new RuleTester();

ruleTester.run('no-underscore', rule, {
    valid: [
        'var aName = 3;',
        '_.map([1,], function(n) { return n; });',
        {
            code: 'var CONST_NAME = 3;',
            options: [{ allowConstants: true }]
        },
        {
            code: 'var _CONST_NAME = 3;',
            options: [{ allowConstants: true, allowLeadingUnderscores: true }]
        },
        {
            code: 'var _a = 3;',
            options: [{ allowLeadingUnderscores: true }]
        }
    ],
    invalid: [
        {
            code: 'var a_name = 3;',
            errors: [{
                message: `Underscore found in 'a_name'`,
                type: 'Identifier'
            }]
        },
        {
            code: 'var CONST_NAME = 3;',
            errors: [{
                message: `Underscore found in 'CONST_NAME'`,
                type: 'Identifier'
            }]
        },
        {
            code: 'var _CONST_NAME = 3;',
            options: [{ allowConstants: true }],
            errors: [{
                message: `Underscore found in '_CONST_NAME'`,
                type: 'Identifier'
            }]
        },
        {
            code: 'var _a = 3;',
            errors: [{
                message: `Underscore found in '_a'`,
                type: 'Identifier'
            }]
        },
        {
            code: 'var _a_name = 3;',
            options: [{ allowLeadingUnderscores: true }],
            errors: [{
                message: `Underscore found in '_a_name'`,
                type: 'Identifier'
            }]
        },
        {
            code: 'var a = { a_name: 3 };',
            errors: [{
                message: `Underscore found in 'a_name'`,
                type: 'Identifier'
            }]
        },
        {
            code: 'var a = {}; a.a_name = "a"',
            errors: [{
                message: `Underscore found in 'a_name'`,
                type: 'Identifier'
            }]
        },
        {
            code: 'function a(_a) { return 1; }',
            errors: [{
                message: `Underscore found in '_a'`,
                type: 'Identifier'
            }]
        },
    ]
});
