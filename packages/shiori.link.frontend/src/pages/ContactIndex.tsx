import { AppLink } from '@/components/AppLink';
import { ContactCreateModal } from '@/components/ContactCreateModal';
import { useProgressBar } from '@/components/useProgressBar';
import { ContactDto } from '@/models/dto/ContactDto';
import { TablePagination } from '@/pages/components/TablePagination';
import { ContactSearchStore } from '@/stores/ContactSearchStore';
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

interface ContactCreateButtonProps {
	onSave: (contact: ContactDto) => void;
}

const ContactCreateButton = memo(
	({ onSave }: ContactCreateButtonProps): ReactElement => {
		const [isModalVisible, setIsModalVisible] = useState(false);
		const closeModal = (): void => setIsModalVisible(false);
		const showModal = (): void => setIsModalVisible(true);

		const handleSave = useCallback(
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
	({ contactSearchStore }: ContactIndexHeaderProps): ReactElement => {
		const handleSaveContact = useCallback(
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
	({ contactSearchStore }: ContactIndexBodyProps): ReactElement => {
		const [, setLoading] = useProgressBar();
		useEffect(
			() => setLoading(contactSearchStore.loading),
			[contactSearchStore.loading, setLoading],
		);

		useLocationStateStore(contactSearchStore);

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
									<AppLink href={`/contacts/${contact.id}`}>
										{contact.name}
									</AppLink>
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

const ContactIndex = memo((): ReactElement => {
	const [contactSearchStore] = useState(() => new ContactSearchStore());

	return (
		<>
			<ContactIndexHeader contactSearchStore={contactSearchStore} />

			<ContactIndexBody contactSearchStore={contactSearchStore} />
		</>
	);
});

export default ContactIndex;
