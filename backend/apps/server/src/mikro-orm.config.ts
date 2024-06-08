import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export default defineConfig({
	highlighter: new SqlHighlighter(),
	migrations: {
		snapshotName: '.snapshot',
		path: './dist/migrations',
		pathTs: './src/migrations',
		disableForeignKeys: false,
	},
	schemaGenerator: {
		disableForeignKeys: false,
	},
	entities: [
		'./node_modules/@shiori.link/server.user.module/node_modules/@shiori.link/server.user.infrastructure/dist/persistence/schemas',
		'./node_modules/@shiori.link/server.monolith.module/node_modules/@shiori.link/server.monolith.infrastructure/dist/persistence/schemas',
	],
	entitiesTs: [
		'./node_modules/@shiori.link/server.user.module/node_modules/@shiori.link/server.user.infrastructure/src/persistence/schemas',
		'./node_modules/@shiori.link/server.monolith.module/node_modules/@shiori.link/server.monolith.infrastructure/src/persistence/schemas',
	],
	forceUndefined: true,
	forceUtcTimezone: true,
	allowGlobalContext: false,
	autoJoinOneToOneOwner: false,
	extensions: [Migrator],
});
