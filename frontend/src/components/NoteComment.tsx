import { NoteLink } from '@/components/NoteLink';
import { NoteMarkdownFormat } from '@/components/NoteMarkdownFormat';
import { NoteDto } from '@/models/responses/NoteDto';
import { EuiAvatar, EuiComment } from '@elastic/eui';
import React from 'react';

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
				<NoteMarkdownFormat>{note.text}</NoteMarkdownFormat>
			</EuiComment>
		);
	},
);
