import { EuiPageTemplate } from '@elastic/eui';
import React from 'react';

const NotebookIndex = (): React.ReactElement => {
	return (
		<EuiPageTemplate>
			<EuiPageTemplate.Header
				pageTitle="Notebooks" /* LOC */
				rightSideItems={[]}
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
