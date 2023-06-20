module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
        commonjs: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react'],
    rules: {
        'arrow-body-style': ['error', 'as-needed'],
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.jsx'],
            },
        ],
        'react/jsx-props-no-spreading': 'off',
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        'react/prop-types': 0,
    },
    settings: {
        react: {
            version: '^18.0.28',
        },
    },
};
