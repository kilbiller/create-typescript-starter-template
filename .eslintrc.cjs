module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: "module", // Allows for the use of imports
	},
	env: {
		jest: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:unicorn/recommended",
		"prettier",
	],
	rules: {
		"array-callback-return": ["error", { checkForEach: true }],
		"no-constant-binary-expression": "error",
		"no-eval": "error",
		"no-var": "error",
		"prefer-const": "error",
		"prefer-rest-params": "error",
		"prefer-spread": "error",
		"prefer-template": "error",
		"spaced-comment": "error",
		"unicorn/catch-error-name": [
			"error",
			{
				name: "err",
			},
		],
		"unicorn/consistent-destructuring": "off", // bugged
		"unicorn/filename-case": [
			"error",
			{
				cases: { camelCase: true, pascalCase: true, snakeCase: true },
			},
		],
		"unicorn/no-null": "off",
		"unicorn/prefer-export-from": "off", // bugged
		"unicorn/prevent-abbreviations": "off",
	},
};
