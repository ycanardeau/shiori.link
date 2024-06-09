import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export default defineConfig({
	highlighter: new SqlHighlighter(),
	migrations: {
		snapshotName: '.snapshot',
		path: './dist/apps/server/src/migrations',
		pathTs: './apps/server/src/migrations',
		disableForeignKeys: false,
	},
	schemaGenerator: {
		disableForeignKeys: false,
	},
	entities: ['./dist/**/infrastructure/src/persistence/schemas/*.js'],
	forceUndefined: true,
	forceUtcTimezone: true,
	allowGlobalContext: false,
	autoJoinOneToOneOwner: false,
	extensions: [Migrator],
});
