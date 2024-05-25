import { contactApi } from '@/api/ContactApi';
import { AppPageTemplateHeader } from '@/components/AppPageTemplateHeader';
import { useProgressBar } from '@/components/useProgressBar';
import { ContactDto } from '@/models/dto/ContactDto';
import { EuiPageTemplate } from '@elastic/eui';
import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ContactDetailsPageTemplateProps {
	contact: ContactDto;
}

const ContactDetailsPageTemplate = ({
	contact,
}: ContactDetailsPageTemplateProps): ReactElement => {
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

const ContactDetails = (): ReactElement => {
	const { id } = useParams();

	const [contact, setContact] = useState<ContactDto>();

	const [, setLoading] = useProgressBar();
	useEffect(() => {
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
