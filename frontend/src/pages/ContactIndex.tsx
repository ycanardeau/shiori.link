import { contactApi } from '@/api/ContactApi';
import { ContactCreateModal } from '@/components/ContactCreateModal';
import { ContactDto } from '@/models/responses/ContactDto';
import { EuiButton, EuiPageTemplate } from '@elastic/eui';
import { AddRegular } from '@fluentui/react-icons';
import React from 'react';

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

const ContactIndex = (): React.ReactElement => {
	const [contacts, setContacts] = React.useState<ContactDto[]>([]);

	const handleSaveContact = React.useCallback(
		(contact: ContactDto): void => {
			setContacts([contact, ...contacts]);
		},
		[contacts],
	);

	React.useEffect(() => {
		contactApi.list({}).then((result) => {
			if (result.ok) {
				setContacts(result.val.items);
			}
		});
	}, []);

	return (
		<EuiPageTemplate>
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

			<EuiPageTemplate.Section></EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};

export default ContactIndex;
