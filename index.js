/**
 * @fileoverview Restricts underscore everywhere
 * @author Krisztian Nagy
 */

'use strict';

module.exports = {
    rules: {
        'no-underscore': {
            meta: {
                docs: {
                    description: 'Restricts underscore everywhere',
                    category: '',
                    recommended: false
                },
                schema: [{
                    type: 'object',
                    properties: {
                        allowConstants: {
                            type: 'boolean'
                        },
                        allowLeadingUnderscores: {
                            type: 'boolean'
                        }
                    },
                    additionalProperties: false
                }]
            },

            create: (context) => {
                const options = context.options[0] || {};

                function hasUnderscore(text) {
                    return text.indexOf('_') > -1;
                }

                function isConstant(text) {
                    return text === text.toUpperCase() && text[0] !== '_';
                }

                function report(node) {
                    context.report({
                        node,
                        message: `Underscore found in '${node.name}'`
                    });
                }

                return {
                    Identifier: (node) => {
                        let name = node.name;

                        if (name === '_') return;
                        if (options.allowLeadingUnderscores) {
                            name = name.replace(/^_+/g, '');
                        }
                        if (options.allowConstants && isConstant(name)) return;
                        if (!hasUnderscore(name)) return;

                        report(node);
                    }
                }
            }
        }
    }
};
