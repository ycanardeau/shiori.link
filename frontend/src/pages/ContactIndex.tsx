import { ContactCreateModal } from '@/components/ContactCreateModal';
import { useProgressBar } from '@/components/useProgressBar';
import { ContactDto } from '@/models/dto/ContactDto';
import { TablePagination } from '@/pages/components/TablePagination';
import { ContactSearchStore } from '@/stores/ContactSearchStore';
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

interface ContactCreateButtonProps {
	onSave: (contact: ContactDto) => void;
}

const ContactCreateButton = React.memo(
	({ onSave }: ContactCreateButtonProps): React.ReactElement => {
		const [isModalVisible, setIsModalVisible] = React.useState(false);
		const closeModal = (): void => setIsModalVisible(false);
		const showModal = (): void => setIsModalVisible(true);

		const handleSave = React.useCallback(
			(contact: ContactDto) => {
				closeModal();

				onSave(contact);
			},
			[onSave],
		);

		return (
			<>
				<EuiButton iconType={AddRegular} onClick={showModal}>
					Add contact{/* LOC */}
				</EuiButton>

				{isModalVisible && (
					<ContactCreateModal
						onCancel={closeModal}
						onSave={handleSave}
					/>
				)}
			</>
		);
	},
);

interface ContactIndexHeaderProps {
	contactSearchStore: ContactSearchStore;
}

const ContactIndexHeader = observer(
	({ contactSearchStore }: ContactIndexHeaderProps): React.ReactElement => {
		const handleSaveContact = React.useCallback(
			async (contact: ContactDto): Promise<void> => {
				await contactSearchStore.updateResults(true);
			},
			[contactSearchStore],
		);

		return (
			<EuiPageTemplate.Header
				pageTitle="Contacts" /* LOC */
				rightSideItems={[
					<ContactCreateButton onSave={handleSaveContact} />,
				]}
				breadcrumbs={[
					{
						text: 'Contacts' /* LOC */,
					},
				]}
			/>
		);
	},
);

interface ContactIndexBodyProps {
	contactSearchStore: ContactSearchStore;
}

const ContactIndexBody = observer(
	({ contactSearchStore }: ContactIndexBodyProps): React.ReactElement => {
		const [, setLoading] = useProgressBar();
		React.useEffect(
			() => setLoading(contactSearchStore.loading),
			[contactSearchStore.loading, setLoading],
		);

		useLocationStateStore(contactSearchStore);

		const navigate = useNavigate();

		return (
			<EuiPageTemplate.Section>
				<EuiTable>
					<EuiTableHeader>
						<EuiTableHeaderCell>Name{/* LOC */}</EuiTableHeaderCell>
					</EuiTableHeader>

					<EuiTableBody>
						{contactSearchStore.items.map((contact) => (
							<EuiTableRow key={contact.id}>
								<EuiTableRowCell>
									<EuiLink
										href={`/contacts/${contact.id}`}
										onClick={(
											e: React.MouseEvent,
										): void => {
											e.preventDefault();
											navigate(`/contacts/${contact.id}`);
										}}
									>
										{[
											contact.lastName,
											contact.firstName,
										].join(' ')}
									</EuiLink>
								</EuiTableRowCell>
							</EuiTableRow>
						))}
					</EuiTableBody>
				</EuiTable>

				<EuiSpacer size="m" />

				<TablePagination
					paginationStore={contactSearchStore.paginationStore}
				/>
			</EuiPageTemplate.Section>
		);
	},
);

const ContactIndex = React.memo((): React.ReactElement => {
	const [contactSearchStore] = React.useState(() => new ContactSearchStore());

	return (
		<>
			<ContactIndexHeader contactSearchStore={contactSearchStore} />

			<ContactIndexBody contactSearchStore={contactSearchStore} />
		</>
	);
});

export default ContactIndex;
