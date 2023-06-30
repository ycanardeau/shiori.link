import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const options: Options = {
	highlighter: new SqlHighlighter(),
	metadataProvider: TsMorphMetadataProvider,
	migrations: {
		snapshotName: '.snapshot',
	},
};

export default options;
