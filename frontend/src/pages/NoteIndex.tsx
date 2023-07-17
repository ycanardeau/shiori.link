import { noteApi } from '@/api/NoteApi';
import { BookmarkCreateModal } from '@/components/BookmarkCreateModal';
import { NoteComment } from '@/components/NoteComment';
import { NoteCreateModal } from '@/components/NoteCreateModal';
import { NoteDto } from '@/models/responses/NoteDto';
import { EuiButton, EuiCommentList, EuiPageTemplate } from '@elastic/eui';
import { AddRegular } from '@fluentui/react-icons';
import React from 'react';

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

interface BookmarkCreateButtonProps {
	onSave: (note: NoteDto) => void;
}

const BookmarkCreateButton = React.memo(
	({ onSave }: BookmarkCreateButtonProps): React.ReactElement => {
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
					Add bookmark{/* LOC */}
				</EuiButton>

				{isModalVisible && (
					<BookmarkCreateModal
						onCancel={closeModal}
						onSave={handleSave}
					/>
				)}
			</>
		);
	},
);

interface NoteCreateButtonProps {
	onSave: (note: NoteDto) => void;
}

const NoteCreateButton = React.memo(
	({ onSave }: NoteCreateButtonProps): React.ReactElement => {
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
					<NoteCreateModal
						onCancel={closeModal}
						onSave={handleSave}
					/>
				)}
			</>
		);
	},
);

const NoteIndex = (): React.ReactElement => {
	const [notes, setNotes] = React.useState<NoteDto[]>([]);

	const handleSaveNote = React.useCallback(
		(note: NoteDto): void => {
			setNotes([note, ...notes]);
		},
		[notes],
	);

	const handleSaveBookmark = React.useCallback(
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
				rightSideItems={[
					<NoteCreateButton onSave={handleSaveNote} />,
					<BookmarkCreateButton onSave={handleSaveBookmark} />,
				]}
				breadcrumbs={[
					{
						text: 'Notes' /* LOC */,
					},
				]}
			/>

			<EuiPageTemplate.Section>
				<NoteCommentList notes={notes} />
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};

export default NoteIndex;
