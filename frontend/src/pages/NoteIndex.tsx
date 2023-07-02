import { NoteCreateModal } from '@/components/NoteCreateModal';
import { NoteDto } from '@/models/responses/NoteDto';
import {
	EuiAvatar,
	EuiButton,
	EuiComment,
	EuiCommentList,
	EuiPageTemplate,
} from '@elastic/eui';
import { AddRegular } from '@fluentui/react-icons';
import React from 'react';

import { noteApi } from '../api/NoteApi';

interface NoteCommentProps {
	note: NoteDto;
}

const NoteComment = React.memo(
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
				timestamp={note.createdAt}
			>
				{note.text}
			</EuiComment>
		);
	},
);

interface NoteCommentListProps {
	notes: readonly NoteDto[];
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
	const [notes, setNotes] = React.useState<readonly NoteDto[]>([]);

	const handleSave = React.useCallback(
		(note: NoteDto): void => {
			setNotes([note, ...notes]);
		},
		[notes],
	);

	React.useEffect(() => {
		noteApi.list({}).then((result) => {
			if (result.ok) {
				setNotes(result.val.items);
			}
		});
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
