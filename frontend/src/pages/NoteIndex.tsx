import { NoteCreateModal } from '@/components/NoteCreateModal';
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

interface NoteCreateButtonProps {
	onSave: (note: NoteDto) => void;
}

const NoteCreateButton = React.memo(({ onSave }: NoteCreateButtonProps) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const closeModal = (): void => setIsModalVisible(false);
	const showModal = (): void => setIsModalVisible(true);

	const handleSave = React.useCallback(
		(note: NoteDto) => {
			closeModal();

			onSave(note);
		},
		[onSave],
	);

	return (
		<>
			<EuiButton iconType={AddRegular} onClick={showModal}>
				Add note{/* LOC */}
			</EuiButton>

			{isModalVisible && (
				<NoteCreateModal onCancel={closeModal} onSave={handleSave} />
			)}
		</>
	);
});

const NoteIndex = (): React.ReactElement => {
	const [notes, setNotes] = React.useState<NoteDto[]>([]);

	const handleSave = React.useCallback(
		(note: NoteDto): void => {
			setNotes([note, ...notes]);
		},
		[notes],
	);

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
				rightSideItems={[<NoteCreateButton onSave={handleSave} />]}
			/>

			<EuiPageTemplate.Section>
				<NoteCommentList notes={notes} />
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};

export default NoteIndex;
