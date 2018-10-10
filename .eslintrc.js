module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/standard'],
    rules: {
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        semi: ['error', 'always'],
        indent: ['error', 4, { SwitchCase: 1 }],
        eqeqeq: 'off',
        'no-unused-vars': [
            'error',
            { vars: 'all', args: 'none', ignoreRestSiblings: false }
        ],
        'handle-callback-err': 0,
        'space-before-function-paren': [
            'error',
            { anonymous: 'never', named: 'never', asyncArrow: 'always' }
        ],
        'import/first': 'off',
        camelcase: 0,
        'standard/computed-property-even-spacing': [2, 'never'],
        'standard/no-callback-literal': [2, 'never'],
        'prefer-promise-reject-errors': 'off',
        'no-useless-return': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
