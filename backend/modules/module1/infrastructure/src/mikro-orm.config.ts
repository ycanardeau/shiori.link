import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

import { LoginSchema } from './persistence/schemas/LoginSchema';
import { UserSchema } from './persistence/schemas/UserSchema';

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
	entities: [LoginSchema, UserSchema],
	forceUndefined: true,
	forceUtcTimezone: true,
	allowGlobalContext: false,
	autoJoinOneToOneOwner: false,
	extensions: [Migrator],
});
