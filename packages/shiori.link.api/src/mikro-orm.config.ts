import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export default defineConfig({
	highlighter: new SqlHighlighter(),
	metadataProvider: TsMorphMetadataProvider,
	migrations: {
		snapshotName: '.snapshot',
		path: './dist/migrations',
		pathTs: './src/migrations',
		disableForeignKeys: false,
	},
	schemaGenerator: {
		disableForeignKeys: false,
	},
	entities: ['./dist/entities/**/*.js'],
	entitiesTs: ['./src/entities/**/*.ts'],
	forceUndefined: true,
	forceUtcTimezone: true,
	allowGlobalContext: false,
	autoJoinOneToOneOwner: false,
	extensions: [Migrator],
});
