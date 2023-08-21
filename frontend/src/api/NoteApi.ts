import { BookmarkNoteCreateRequest } from '@/models/requests/BookmarkNoteCreateRequest';
import { MarkdownNoteCreateRequest } from '@/models/requests/MarkdownNoteCreateRequest';
import { NoteDeleteRequest } from '@/models/requests/NoteDeleteRequest';
import { NoteGetRequest } from '@/models/requests/NoteGetRequest';
import { NoteListRequest } from '@/models/requests/NoteListRequest';
import { NoteCreateResponse } from '@/models/responses/NoteCreateResponse';
import { NoteDeleteResponse } from '@/models/responses/NoteDeleteResponse';
import { NoteGetResponse } from '@/models/responses/NoteGetResponse';
import { NoteListResponse } from '@/models/responses/NoteListResponse';
import { stringify } from 'qs';
import { Err, Ok, Result } from 'ts-results';

class NoteApi {
	async createBookmark(
		request: BookmarkNoteCreateRequest,
	): Promise<Result<NoteCreateResponse, Error>> {
		try {
			const response = await fetch('/api/note/bookmark/create', {
				method: 'POST',
				body: JSON.stringify(request),
			});
			const json = await response.json();
			return new Ok(json);
		} catch (error) {
			if (error instanceof Error) {
				return new Err(error);
			} else {
				throw error;
			}
		}
	}

	async createMarkdown(
		request: MarkdownNoteCreateRequest,
	): Promise<Result<NoteCreateResponse, Error>> {
		try {
			const response = await fetch('/api/note/markdown/create', {
				method: 'POST',
				body: JSON.stringify(request),
			});
			const json = await response.json();
			return new Ok(json);
		} catch (error) {
			if (error instanceof Error) {
				return new Err(error);
			} else {
				throw error;
			}
		}
	}

	async delete(
		request: NoteDeleteRequest,
	): Promise<Result<NoteDeleteResponse, Error>> {
		try {
			const response = await fetch(`/api/note/delete`, {
				method: 'POST',
				body: JSON.stringify(request),
			});
			const json = await response.json();
			return new Ok(json);
		} catch (error) {
			if (error instanceof Error) {
				return new Err(error);
			} else {
				throw error;
			}
		}
	}

	async get(
		request: NoteGetRequest,
	): Promise<Result<NoteGetResponse, Error>> {
		try {
			const response = await fetch(`/api/note/get?${stringify(request)}`);
			const json = await response.json();
			return new Ok(json);
		} catch (error) {
			if (error instanceof Error) {
				return new Err(error);
			} else {
				throw error;
			}
		}
	}

	async list(
		request: NoteListRequest,
	): Promise<Result<NoteListResponse, Error>> {
		try {
			const response = await fetch(
				`/api/note/list?${stringify(request)}`,
			);
			const json = await response.json();
			return new Ok(json);
		} catch (error) {
			if (error instanceof Error) {
				return new Err(error);
			} else {
				throw error;
			}
		}
	}
}

export const noteApi = new NoteApi();
