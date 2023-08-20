import { NotebookCreateModal } from '@/components/NotebookCreateModal';
import { useProgressBar } from '@/components/useProgressBar';
import { NotebookDto } from '@/models/dto/NotebookDto';
import { TablePagination } from '@/pages/components/TablePagination';
import { NotebookSearchStore } from '@/stores/NotebookSearchStore';
import { useLocationStateStore } from '@aigamo/route-sphere';
import {
	EuiButton,
	EuiLink,
	EuiPageTemplate,
	EuiSpacer,
	EuiTable,
	EuiTableBody,
	EuiTableHeader,
	EuiTableHeaderCell,
	EuiTableRow,
	EuiTableRowCell,
} from '@elastic/eui';
import { AddRegular } from '@fluentui/react-icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NotebookCreateButtonProps {
	onSave: (notebook: NotebookDto) => void;
}

const NotebookCreateButton = React.memo(
	({ onSave }: NotebookCreateButtonProps): React.ReactElement => {
		const [isModalVisible, setIsModalVisible] = React.useState(false);
		const closeModal = (): void => setIsModalVisible(false);
		const showModal = (): void => setIsModalVisible(true);

		const handleSave = React.useCallback(
			(notebook: NotebookDto) => {
				closeModal();

				onSave(notebook);
			},
			[onSave],
		);

		return (
			<>
				<EuiButton iconType={AddRegular} onClick={showModal}>
					Add notebook{/* LOC */}
				</EuiButton>

				{isModalVisible && (
					<NotebookCreateModal
						onCancel={closeModal}
						onSave={handleSave}
					/>
				)}
			</>
		);
	},
);

interface NotebookIndexHeaderProps {
	notebookSearchStore: NotebookSearchStore;
}

const NotebookIndexHeader = observer(
	({ notebookSearchStore }: NotebookIndexHeaderProps): React.ReactElement => {
		const handleSaveNotebook = React.useCallback(
			async (notebook: NotebookDto): Promise<void> => {
				await notebookSearchStore.updateResults(true);
			},
			[notebookSearchStore],
		);

		return (
			<EuiPageTemplate.Header
				pageTitle="Notebooks" /* LOC */
				rightSideItems={[
					<NotebookCreateButton onSave={handleSaveNotebook} />,
				]}
				breadcrumbs={[
					{
						text: 'Notebooks' /* LOC */,
					},
				]}
			/>
		);
	},
);

interface NotebookIndexBodyProps {
	notebookSearchStore: NotebookSearchStore;
}

const NotebookIndexBody = observer(
	({ notebookSearchStore }: NotebookIndexBodyProps): React.ReactElement => {
		const [, setLoading] = useProgressBar();
		React.useEffect(
			() => setLoading(notebookSearchStore.loading),
			[notebookSearchStore.loading, setLoading],
		);

		useLocationStateStore(notebookSearchStore);

		const navigate = useNavigate();

		return (
			<EuiPageTemplate.Section>
				<EuiTable>
					<EuiTableHeader>
						<EuiTableHeaderCell>Name{/* LOC */}</EuiTableHeaderCell>
					</EuiTableHeader>

					<EuiTableBody>
						{notebookSearchStore.items.map((notebook) => (
							<EuiTableRow key={notebook.id}>
								<EuiTableRowCell>
									<EuiLink
										href={`/notebooks/${notebook.id}`}
										onClick={(
											e: React.MouseEvent,
										): void => {
											e.preventDefault();
											navigate(
												`/notebooks/${notebook.id}`,
											);
										}}
									>
										{notebook.name}
									</EuiLink>
								</EuiTableRowCell>
							</EuiTableRow>
						))}
					</EuiTableBody>
				</EuiTable>

				<EuiSpacer size="m" />

				<TablePagination
					paginationStore={notebookSearchStore.paginationStore}
				/>
			</EuiPageTemplate.Section>
		);
	},
);

const NotebookIndex = React.memo((): React.ReactElement => {
	const [notebookSearchStore] = React.useState(
		() => new NotebookSearchStore(),
	);

	return (
		<EuiPageTemplate>
			<NotebookIndexHeader notebookSearchStore={notebookSearchStore} />

			<NotebookIndexBody notebookSearchStore={notebookSearchStore} />
		</EuiPageTemplate>
	);
});

export default NotebookIndex;
