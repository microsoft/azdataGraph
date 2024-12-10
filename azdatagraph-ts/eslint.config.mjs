import licenseHeader from "eslint-plugin-license-header";
import tseslint from 'typescript-eslint';

export default [
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
        },
        plugins: {
            'license-header': licenseHeader,
        },
        rules: {
            "license-header/header": [
                "error",
                [
                    "/*---------------------------------------------------------------------------------------------",
                    " *  Copyright (c) Microsoft Corporation. All rights reserved.",
                    " *  Licensed under the Source EULA.See License.txt in the project root for license information.",
                    " * --------------------------------------------------------------------------------------------*/",
                ]
            ],
            "no-var": "error",
            "prefer-const": "error",
            "eqeqeq": "error",
        }
    }
];