import { EuiPageTemplate } from '@elastic/eui';
import React from 'react';

const ContactIndex = (): React.ReactElement => {
	return (
		<EuiPageTemplate>
			<EuiPageTemplate.Header
				pageTitle="Contacts" /* LOC */
				rightSideItems={[]}
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
