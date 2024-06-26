import { AppLink } from '@/components/AppLink';
import { NotebookCreateModal } from '@/components/NotebookCreateModal';
import { useProgressBar } from '@/components/useProgressBar';
import { NotebookDto } from '@/models/dto/NotebookDto';
import { TablePagination } from '@/pages/components/TablePagination';
import { NotebookSearchStore } from '@/stores/NotebookSearchStore';
import { useLocationStateStore } from '@aigamo/route-sphere';
import {
	EuiButton,
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
import { ReactElement, memo, useCallback, useEffect, useState } from 'react';

interface NotebookCreateButtonProps {
	onSave: (notebook: NotebookDto) => void;
}

const NotebookCreateButton = memo(
	({ onSave }: NotebookCreateButtonProps): ReactElement => {
		const [isModalVisible, setIsModalVisible] = useState(false);
		const closeModal = (): void => setIsModalVisible(false);
		const showModal = (): void => setIsModalVisible(true);

		const handleSave = useCallback(
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
	({ notebookSearchStore }: NotebookIndexHeaderProps): ReactElement => {
		const handleSaveNotebook = useCallback(
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
	({ notebookSearchStore }: NotebookIndexBodyProps): ReactElement => {
		const [, setLoading] = useProgressBar();
		useEffect(
			() => setLoading(notebookSearchStore.loading),
			[notebookSearchStore.loading, setLoading],
		);

		useLocationStateStore(notebookSearchStore);

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
									<AppLink href={`/notebooks/${notebook.id}`}>
										{notebook.name}
									</AppLink>
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

const NotebookIndex = memo((): ReactElement => {
	const [notebookSearchStore] = useState(() => new NotebookSearchStore());

	return (
		<>
			<NotebookIndexHeader notebookSearchStore={notebookSearchStore} />

			<NotebookIndexBody notebookSearchStore={notebookSearchStore} />
		</>
	);
});

export default NotebookIndex;
