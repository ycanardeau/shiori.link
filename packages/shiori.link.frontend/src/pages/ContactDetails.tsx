import { contactApi } from '@/api/ContactApi';
import { AppPageTemplateHeader } from '@/components/AppPageTemplateHeader';
import { useProgressBar } from '@/components/useProgressBar';
import { ContactDto } from '@/models/dto/ContactDto';
import { EuiPageTemplate } from '@elastic/eui';
import React from 'react';
import { useParams } from 'react-router-dom';

interface ContactDetailsPageTemplateProps {
	contact: ContactDto;
}

const ContactDetailsPageTemplate = ({
	contact,
}: ContactDetailsPageTemplateProps): React.ReactElement => {
	return (
		<>
			<AppPageTemplateHeader
				pageTitle={[contact.lastName, contact.firstName].join(' ')}
				rightSideItems={[]}
				breadcrumbs={[
					{
						href: '/contacts',
						text: 'Contacts' /* LOC */,
					},
					{
						text: [contact.lastName, contact.firstName].join(' '),
					},
				]}
			/>

			<EuiPageTemplate.Section></EuiPageTemplate.Section>
		</>
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
