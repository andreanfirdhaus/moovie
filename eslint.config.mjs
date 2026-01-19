import globals from 'globals';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: ['dist', 'node_modules', 'vite.config.ts', 'eslint.config.mjs']
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        files: ['src/**/*.tsx', 'src/**/*.ts'],
        plugins: {
            react,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2020,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...react.configs.recommended.rules,

            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            'no-duplicate-imports': 'error',

            'no-unused-vars': 'off',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'eqeqeq': ['error', 'always'],
            'prefer-const': 'error',

            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
        },
    },

    prettier,
];