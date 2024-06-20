module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
		tsconfigRootDir: __dirname,
		ecmaVersion: 'latest',
	},
	plugins: [
		'@typescript-eslint/eslint-plugin',
		'simple-import-sort',
		'import',
		'boundaries',
	],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:boundaries/recommended',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.cjs'],
	settings: {
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},
		'boundaries/elements': [
			{
				type: '@shiori.link/server',
				pattern: 'apps/server/*',
			},
			{
				type: '@shiori.link/server.mikro-orm.shared',
				pattern: 'libs/mikro-orm.shared/*',
			},
			{
				type: '@shiori.link/server.module1.application',
				pattern: 'modules/module1/application/*',
			},
			{
				type: '@shiori.link/server.module1.contracts',
				pattern: 'modules/module1/contracts/*',
			},
			{
				type: '@shiori.link/server.module1.domain',
				pattern: 'modules/module1/domain/*',
			},
			{
				type: '@shiori.link/server.module1.endpoints',
				pattern: 'modules/module1/endpoints/*',
			},
			{
				type: '@shiori.link/server.module1.infrastructure',
				pattern: 'modules/module1/infrastructure/*',
			},
			{
				type: '@shiori.link/server.module1.module',
				pattern: 'modules/module1/module/*',
			},
			{
				type: '@shiori.link/server.monolith.application',
				pattern: 'modules/monolith/application/*',
			},
			{
				type: '@shiori.link/server.monolith.contracts',
				pattern: 'modules/monolith/contracts/*',
			},
			{
				type: '@shiori.link/server.monolith.domain',
				pattern: 'modules/monolith/domain/*',
			},
			{
				type: '@shiori.link/server.monolith.endpoints',
				pattern: 'modules/monolith/endpoints/*',
			},
			{
				type: '@shiori.link/server.monolith.infrastructure',
				pattern: 'modules/monolith/infrastructure/*',
			},
			{
				type: '@shiori.link/server.monolith.module',
				pattern: 'modules/monolith/module/*',
			},
			{
				type: '@shiori.link/server.user.application',
				pattern: 'modules/user/application/*',
			},
			{
				type: '@shiori.link/server.user.contracts',
				pattern: 'modules/user/contracts/*',
			},
			{
				type: '@shiori.link/server.user.domain',
				pattern: 'modules/user/domain/*',
			},
			{
				type: '@shiori.link/server.user.endpoints',
				pattern: 'modules/user/endpoints/*',
			},
			{
				type: '@shiori.link/server.user.infrastructure',
				pattern: 'modules/user/infrastructure/*',
			},
			{
				type: '@shiori.link/server.user.module',
				pattern: 'modules/user/module/*',
			},
		],
	},
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'error',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'boundaries/element-types': [
			2,
			{
				default: 'disallow',
				rules: [
					{
						from: '@shiori.link/server',
						allow: [
							'@shiori.link/server.mikro-orm.shared',
							'@shiori.link/server.monolith.module',
							'@shiori.link/server.user.module',
						],
					},
					{
						from: '@shiori.link/server.mikro-orm.shared',
						allow: [],
					},
					{
						from: '@shiori.link/server.module1.application',
						allow: ['@shiori.link/server.module1.domain'],
					},
					{
						from: '@shiori.link/server.module1.domain',
						allow: [],
					},
					{
						from: '@shiori.link/server.module1.endpoints',
						allow: [
							'@shiori.link/server.mikro-orm.shared' /* TODO: remove */,
							'@shiori.link/server.module1.application',
							'@shiori.link/server.module1.contracts',
							'@shiori.link/server.module1.domain',
						],
					},
					{
						from: '@shiori.link/server.module1.infrastructure',
						allow: [
							'@shiori.link/server.module1.application',
							'@shiori.link/server.module1.domain',
						],
					},
					{
						from: '@shiori.link/server.module1.module',
						allow: [
							'@shiori.link/server.module1.endpoints',
							'@shiori.link/server.module1.infrastructure',
						],
					},
					{
						from: '@shiori.link/server.monolith.application',
						allow: ['@shiori.link/server.monolith.domain'],
					},
					{
						from: '@shiori.link/server.monolith.domain',
						allow: [],
					},
					{
						from: '@shiori.link/server.monolith.endpoints',
						allow: [
							'@shiori.link/server.mikro-orm.shared' /* TODO: remove */,
							'@shiori.link/server.monolith.application',
							'@shiori.link/server.monolith.contracts',
							'@shiori.link/server.monolith.domain',
						],
					},
					{
						from: '@shiori.link/server.monolith.infrastructure',
						allow: [
							'@shiori.link/server.mikro-orm.shared',
							'@shiori.link/server.monolith.application',
							'@shiori.link/server.monolith.domain',
						],
					},
					{
						from: '@shiori.link/server.monolith.module',
						allow: [
							'@shiori.link/server.monolith.endpoints',
							'@shiori.link/server.monolith.infrastructure',
						],
					},
					{
						from: '@shiori.link/server.user.application',
						allow: ['@shiori.link/server.user.domain'],
					},
					{
						from: '@shiori.link/server.user.domain',
						allow: [],
					},
					{
						from: '@shiori.link/server.user.endpoints',
						allow: [
							'@shiori.link/server.mikro-orm.shared' /* TODO: remove */,
							'@shiori.link/server.user.application',
							'@shiori.link/server.user.contracts',
							'@shiori.link/server.user.domain',
						],
					},
					{
						from: '@shiori.link/server.user.infrastructure',
						allow: [
							'@shiori.link/server.mikro-orm.shared',
							'@shiori.link/server.user.application',
							'@shiori.link/server.user.domain',
						],
					},
					{
						from: '@shiori.link/server.user.module',
						allow: [
							'@shiori.link/server.user.endpoints',
							'@shiori.link/server.user.infrastructure',
						],
					},
				],
			},
		],
	},
};
