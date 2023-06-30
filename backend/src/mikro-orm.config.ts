import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const options: Options = {
	highlighter: new SqlHighlighter(),
	metadataProvider: TsMorphMetadataProvider,
};

export default options;
