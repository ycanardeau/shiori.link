import { BookmarkNoteCreateModal } from '@/components/BookmarkNoteCreateModal';
import { DateNoteCreateModal } from '@/components/DateNoteCreateModal';
import { MarkdownNoteCreateModal } from '@/components/MarkdownNoteCreateModal';
import { NoteComment } from '@/components/NoteComment';
import { PurchaseNoteCreateModal } from '@/components/PurchaseNoteCreateModal';
import { useProgressBar } from '@/components/useProgressBar';
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
import { ReactElement, memo, useCallback, useEffect, useState } from 'react';

interface NoteCommentListProps {
	notes: readonly NoteDto[];
}

const NoteCommentList = memo(
	({ notes }: NoteCommentListProps): ReactElement => {
		return (
			<EuiCommentList>
				{notes.map((note) => (
					<NoteComment key={note.id} note={note} />
				))}
			</EuiCommentList>
		);
	},
);

interface BookmarkNoteCreateButtonProps {
	onSave: (note: NoteDto) => void;
}

const BookmarkNoteCreateButton = memo(
	({ onSave }: BookmarkNoteCreateButtonProps): ReactElement => {
		const [isModalVisible, setIsModalVisible] = useState(false);
		const closeModal = (): void => setIsModalVisible(false);
		const showModal = (): void => setIsModalVisible(true);

		const handleSave = useCallback(
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

interface MarkdownNoteCreateButtonProps {
	onSave: (note: NoteDto) => void;
}

const MarkdownNoteCreateButton = memo(
	({ onSave }: MarkdownNoteCreateButtonProps): ReactElement => {
		const [isModalVisible, setIsModalVisible] = useState(false);
		const closeModal = (): void => setIsModalVisible(false);
		const showModal = (): void => setIsModalVisible(true);

		const handleSave = useCallback(
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

interface DateNoteCreateButtonProps {
	onSave: (note: NoteDto) => void;
}

const DateNoteCreateButton = memo(
	({ onSave }: DateNoteCreateButtonProps): ReactElement => {
		const [isModalVisible, setIsModalVisible] = useState(false);
		const closeModal = (): void => setIsModalVisible(false);
		const showModal = (): void => setIsModalVisible(true);

		const handleSave = useCallback(
			(note: NoteDto) => {
				closeModal();

				onSave(note);
			},
			[onSave],
		);

		return (
			<>
				<EuiButton iconType={AddRegular} onClick={showModal}>
					Add date{/* LOC */}
				</EuiButton>

				{isModalVisible && (
					<DateNoteCreateModal
						onCancel={closeModal}
						onSave={handleSave}
					/>
				)}
			</>
		);
	},
);

interface PurchaseNoteCreateButtonProps {
	onSave: (note: NoteDto) => void;
}

const PurchaseNoteCreateButton = memo(
	({ onSave }: PurchaseNoteCreateButtonProps): ReactElement => {
		const [isModalVisible, setIsModalVisible] = useState(false);
		const closeModal = (): void => setIsModalVisible(false);
		const showModal = (): void => setIsModalVisible(true);

		const handleSave = useCallback(
			(note: NoteDto) => {
				closeModal();

				onSave(note);
			},
			[onSave],
		);

		return (
			<>
				<EuiButton iconType={AddRegular} onClick={showModal}>
					Add purchase{/* LOC */}
				</EuiButton>

				{isModalVisible && (
					<PurchaseNoteCreateModal
						onCancel={closeModal}
						onSave={handleSave}
					/>
				)}
			</>
		);
	},
);

interface NoteIndexHeaderProps {
	noteSearchStore: NoteSearchStore;
}

const NoteIndexHeader = observer(
	({ noteSearchStore }: NoteIndexHeaderProps): ReactElement => {
		const handleSaveNote = useCallback(
			async (note: NoteDto): Promise<void> => {
				await noteSearchStore.updateResults(true);
			},
			[noteSearchStore],
		);

		return (
			<EuiPageTemplate.Header
				pageTitle="Notes" /* LOC */
				rightSideItems={[
					<PurchaseNoteCreateButton onSave={handleSaveNote} />,
					<DateNoteCreateButton onSave={handleSaveNote} />,
					<MarkdownNoteCreateButton onSave={handleSaveNote} />,
					<BookmarkNoteCreateButton onSave={handleSaveNote} />,
				]}
				breadcrumbs={[
					{
						text: 'Notes' /* LOC */,
					},
				]}
			/>
		);
	},
);

interface NoteIndexBodyProps {
	noteSearchStore: NoteSearchStore;
}

const NoteIndexBody = observer(
	({ noteSearchStore }: NoteIndexBodyProps): ReactElement => {
		const [, setLoading] = useProgressBar();
		useEffect(
			() => setLoading(noteSearchStore.loading),
			[noteSearchStore.loading, setLoading],
		);

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
	},
);

const NoteIndex = memo((): ReactElement => {
	const [noteSearchStore] = useState(() => new NoteSearchStore());

	return (
		<>
			<NoteIndexHeader noteSearchStore={noteSearchStore} />

			<NoteIndexBody noteSearchStore={noteSearchStore} />
		</>
	);
});

export default NoteIndex;
