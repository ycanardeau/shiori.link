import { EmbedPVPreview } from '@/components/EmbedPVPreview';
import { NoteLink } from '@/components/NoteLink';
import { NoteMarkdownFormat } from '@/components/NoteMarkdownFormat';
import {
	BookmarkNotePayloadDto,
	NoteDto,
	NotePayloadDto,
} from '@/models/dto/NoteDto';
import { NoteType } from '@/models/enums/NoteType';
import {
	EuiAvatar,
	EuiButtonEmpty,
	EuiComment,
	EuiSpacer,
	EuiText,
} from '@elastic/eui';
import { ReactElement, memo } from 'react';

interface BookmarkNoteCommentBodyProps {
	payload: BookmarkNotePayloadDto;
}

const BookmarkNoteCommentBody = memo(
	({ payload }: BookmarkNoteCommentBodyProps): ReactElement => {
		return (
			<>
				<EuiButtonEmpty
					href={payload.url}
					target="_blank"
					iconType={`https://www.google.com/s2/favicons?domain=${
						new URL(payload.url).hostname
					}&sz=${16}`}
				>
					{payload.title || payload.url}
				</EuiButtonEmpty>

				<EuiSpacer size="s" />

				<EmbedPVPreview payload={payload} />
			</>
		);
	},
);

interface NoteCommentBodyProps {
	payload: NotePayloadDto;
}

const NoteCommentBody = memo(
	({ payload }: NoteCommentBodyProps): ReactElement => {
		switch (payload.type) {
			case NoteType.Bookmark:
				return <BookmarkNoteCommentBody payload={payload} />;

			case NoteType.Markdown:
				return <NoteMarkdownFormat>{payload.text}</NoteMarkdownFormat>;

			// TODO: remove
			default:
				return <EuiText>{JSON.stringify(payload)}</EuiText>;
		}
	},
);

interface NoteCommentProps {
	note: NoteDto;
}

export const NoteComment = memo(({ note }: NoteCommentProps): ReactElement => {
	return (
		<EuiComment
			username={note.user.username}
			timelineAvatar={
				<EuiAvatar
					name={note.user.username}
					imageUrl={note.user.avatarUrl}
				/>
			}
			timestamp={
				<NoteLink
					note={note}
					color="text"
					style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
				>
					{note.createdAt}
				</NoteLink>
			}
		>
			<NoteCommentBody payload={note.payload} />
		</EuiComment>
	);
});
