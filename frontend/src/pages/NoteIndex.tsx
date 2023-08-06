import { noteApi } from '@/api/NoteApi';
import { BookmarkNoteCreateModal } from '@/components/BookmarkNoteCreateModal';
import { MarkdownNoteCreateModal } from '@/components/MarkdownNoteCreateModal';
import { NoteComment } from '@/components/NoteComment';
import { NoteDto } from '@/models/dto/NoteDto';
import { PaginatedResponse } from '@/models/responses/PaginatedResponse';
import { PaginationStore } from '@/stores/PaginationStore';
import {
	EuiButton,
	EuiCommentList,
	EuiPageTemplate,
	EuiSpacer,
	EuiTablePagination,
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

const NoteIndex = observer((): React.ReactElement => {
	const [response, setResponse] =
		React.useState<PaginatedResponse<NoteDto>>();

	const [paginationStore] = React.useState(() => new PaginationStore());

	const handleSaveNote = React.useCallback((note: NoteDto): void => {}, []);

	const handleSaveBookmark = React.useCallback((note: NoteDto): void => {},
	[]);

	React.useEffect(() => {
		noteApi.list({}).then((result) => {
			if (result.ok) {
				setResponse(result.val);
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
				{response && (
					<>
						<NoteCommentList notes={response.items} />

						<EuiSpacer />

						<EuiTablePagination
							pageCount={response.totalCount}
							activePage={paginationStore.page - 1}
							onChangePage={(pageIndex): void =>
								paginationStore.setPage(pageIndex + 1)
							}
							itemsPerPage={paginationStore.perPage}
							onChangeItemsPerPage={(pageSize): void =>
								paginationStore.setPerPage(pageSize)
							}
						/>
					</>
				)}
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
});

export default NoteIndex;
