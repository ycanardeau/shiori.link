import { BookmarkNoteCreateModal } from '@/components/BookmarkNoteCreateModal';
import { MarkdownNoteCreateModal } from '@/components/MarkdownNoteCreateModal';
import { NoteComment } from '@/components/NoteComment';
import { NoteDto } from '@/models/dto/NoteDto';
import { TablePagination } from '@/pages/components/TablePagination';
import { NoteSearchStore } from '@/stores/NoteSearchStore';
import { useLocationStateStore } from '@aigamo/route-sphere';
import {
	EuiButton,
	EuiCommentList,
	EuiPageTemplate,
	EuiSpacer,
} from '@elastic/eui';
import { AddRegular } from '@fluentui/react-icons';
import { observer } from 'mobx-react-lite';
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
					<BookmarkNoteCreateModal
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
					Add markdown{/* LOC */}
				</EuiButton>

				{isModalVisible && (
					<MarkdownNoteCreateModal
						onCancel={closeModal}
						onSave={handleSave}
					/>
				)}
			</>
		);
	},
);

const NoteIndexHeader = React.memo((): React.ReactElement => {
	const handleSaveNote = React.useCallback((note: NoteDto): void => {}, []);

	const handleSaveBookmark = React.useCallback((note: NoteDto): void => {},
	[]);

	return (
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
	);
});

const NoteIndexBody = observer((): React.ReactElement => {
	const [noteSearchStore] = React.useState(() => new NoteSearchStore());

	useLocationStateStore(noteSearchStore);

	return (
		<EuiPageTemplate.Section>
			<NoteCommentList notes={noteSearchStore.items} />

			<EuiSpacer size="m" />

			<TablePagination
				paginationStore={noteSearchStore.paginationStore}
			/>
		</EuiPageTemplate.Section>
	);
});

const NoteIndex = React.memo((): React.ReactElement => {
	return (
		<EuiPageTemplate>
			<NoteIndexHeader />

			<NoteIndexBody />
		</EuiPageTemplate>
	);
});

export default NoteIndex;
