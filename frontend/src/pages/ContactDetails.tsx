import { contactApi } from '@/api/ContactApi';
import { useProgressBar } from '@/components/useProgressBar';
import { ContactDto } from '@/models/dto/ContactDto';
import { EuiPageTemplate } from '@elastic/eui';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface ContactDetailsPageTemplateProps {
	contact: ContactDto;
}

const ContactDetailsPageTemplate = ({
	contact,
}: ContactDetailsPageTemplateProps): React.ReactElement => {
	const navigate = useNavigate();

	return (
		<EuiPageTemplate>
			<EuiPageTemplate.Header
				pageTitle={[contact.lastName, contact.firstName].join(' ')}
				rightSideItems={[]}
				breadcrumbs={[
					{
						href: '/contacts',
						onClick: (e): void => {
							e.preventDefault();

							navigate('/contacts');
						},
						text: 'Contacts' /* LOC */,
					},
					{
						text: [contact.lastName, contact.firstName].join(' '),
					},
				]}
			/>

			<EuiPageTemplate.Section></EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};

const ContactDetails = (): React.ReactElement => {
	const { id } = useParams();

	const [contact, setContact] = React.useState<ContactDto>();

	const [, setLoading] = useProgressBar();
	React.useEffect(() => {
		setLoading(true);

		contactApi.get({ id: Number(id) }).then((result) => {
			if (result.ok) {
				setContact(result.val);

				setLoading(false);
			}
		});
	}, [id, setLoading]);

	return contact ? <ContactDetailsPageTemplate contact={contact} /> : <></>;
};

export default ContactDetails;
