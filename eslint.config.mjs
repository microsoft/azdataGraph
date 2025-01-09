import licenseHeader from "eslint-plugin-license-header";
import tseslint from 'typescript-eslint';

export default [
    {
        files: ['src/ts/**/*.ts'],
        ignores: ['src/ts/mxtypings/**/*.d.ts', 'dist/**/*.js'],
        languageOptions: {
            parser: tseslint.parser,
        },
        plugins: {
            'license-header': licenseHeader,
        },
        rules: {
            "no-var": "error",
            "prefer-const": "error",
            "eqeqeq": "error",
        }
    }
];