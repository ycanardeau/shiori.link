import { NoteDto } from '@/models/responses/NoteDto';
import {
	EuiButton,
	EuiComment,
	EuiCommentList,
	EuiPageTemplate,
} from '@elastic/eui';
import { AddRegular } from '@fluentui/react-icons';
import { range } from 'lodash-es';
import React from 'react';

interface NoteCommentProps {
	note: NoteDto;
}

const NoteComment = React.memo(
	({ note }: NoteCommentProps): React.ReactElement => {
		return (
			<EuiComment
				username={note.user.userName}
				timestamp={note.createdAt}
			>
				{note.text}
			</EuiComment>
		);
	},
);

interface NoteCommentListProps {
	notes: NoteDto[];
}

const NoteCommentList = React.memo(
	({ notes }: NoteCommentListProps): React.ReactElement => {
		return (
			<EuiCommentList>
				{notes.map((note) => (
					<NoteComment key={note.id} note={note} />
				))}
			</EuiCommentList>
		);
	},
);

const NoteIndex = (): React.ReactElement => {
	const [notes, setNotes] = React.useState<NoteDto[]>([]);

	React.useEffect(() => {
		setNotes(
			range(0, 100)
				.reverse()
				.map((id) => ({
					_NoteDtoBrand: undefined,
					id: id,
					createdAt: new Date().toISOString(),
					user: {
						_UserDtoBrand: undefined,
						id: 1,
						createdAt: new Date().toISOString(),
						userName: 'aigamo',
					},
					text: `Note ${id + 1}`,
				})),
		);
	}, []);

	return (
		<EuiPageTemplate>
			<EuiPageTemplate.Header
				pageTitle="Notes" /* LOC */
				rightSideItems={[
					<EuiButton iconType={AddRegular}>
						Add note{/* LOC */}
					</EuiButton>,
				]}
			/>
			<EuiPageTemplate.Section>
				<NoteCommentList notes={notes} />
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};

export default NoteIndex;
