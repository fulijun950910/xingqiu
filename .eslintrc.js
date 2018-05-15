module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: { es6: true },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'elemefe',
    // required to lint *.vue files
    plugins: ['html'],
    // add your custom rules here
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        eqeqeq: 'off',
        'no-unused-vars': [
            'error',
            { vars: 'all', args: 'none', ignoreRestSiblings: false }
        ],
        'handle-callback-err': 0,
        'no-debugger': 0
    }
};
