import { JSONSchemaType } from 'ajv';

export interface NoteListRequest {}

export const NoteListRequestSchema: JSONSchemaType<NoteListRequest> = {
	type: 'object',
};
