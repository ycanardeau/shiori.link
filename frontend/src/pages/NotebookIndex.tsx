import { NotebookCreateModal } from '@/components/NotebookCreateModal';
import { NotebookDto } from '@/models/dto/NotebookDto';
import { EuiButton, EuiPageTemplate } from '@elastic/eui';
import { AddRegular } from '@fluentui/react-icons';
import React from 'react';

interface NotebookCreateButtonProps {
	onSave: (notebook: NotebookDto) => void;
}

const NotebookCreateButton = React.memo(
	({ onSave }: NotebookCreateButtonProps): React.ReactElement => {
		const [isModalVisible, setIsModalVisible] = React.useState(false);
		const closeModal = (): void => setIsModalVisible(false);
		const showModal = (): void => setIsModalVisible(true);

		const handleSave = React.useCallback(
			(note: NotebookDto) => {
				closeModal();

				onSave(note);
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

const NotebookIndex = (): React.ReactElement => {
	const handleSaveNotebook = React.useCallback(async () => {}, []);

	return (
		<EuiPageTemplate>
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

			<EuiPageTemplate.Section></EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};

export default NotebookIndex;
