import { NoteLink } from '@/components/NoteLink';
import { NoteMarkdownFormat } from '@/components/NoteMarkdownFormat';
import { NoteDataDto, NoteDto } from '@/models/dto/NoteDto';
import { NoteType } from '@/models/enums/NoteType';
import { EuiAvatar, EuiButtonEmpty, EuiComment, EuiText } from '@elastic/eui';
import React from 'react';

interface NoteCommentBodyProps {
	data: NoteDataDto;
}

const NoteCommentBody = React.memo(
	({ data }: NoteCommentBodyProps): React.ReactElement => {
		switch (data.type) {
			case NoteType.Bookmark:
				return (
					<EuiButtonEmpty
						href={data.url}
						target="_blank"
						iconType={`https://www.google.com/s2/favicons?domain=${
							new URL(data.url).hostname
						}&sz=${16}`}
					>
						{data.title || data.url}
					</EuiButtonEmpty>
				);

			case NoteType.Markdown:
				return <NoteMarkdownFormat>{data.text}</NoteMarkdownFormat>;

			// TODO: remove
			default:
				return <EuiText>{JSON.stringify(data)}</EuiText>;
		}
	},
);

interface NoteCommentProps {
	note: NoteDto;
}

export const NoteComment = React.memo(
	({ note }: NoteCommentProps): React.ReactElement => {
		return (
			<EuiComment
				username={note.user.userName}
				timelineAvatar={
					<EuiAvatar
						name={note.user.userName}
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
				<NoteCommentBody data={note.data} />
			</EuiComment>
		);
	},
);
