import { EuiButton, EuiCommentList, EuiPageTemplate } from '@elastic/eui';
import { AddRegular } from '@fluentui/react-icons';
import { range } from 'lodash-es';
import React from 'react';

const NoteIndex = (): React.ReactElement => {
	return (
		<EuiPageTemplate>
			<EuiPageTemplate.Header
				pageTitle="Notes" /* LOC */
				rightSideItems={[
					<EuiButton iconType={AddRegular}>
						Add note{/* LOC */}
					</EuiButton>,
				]}
			/>
			<EuiPageTemplate.Section>
				<EuiCommentList
					comments={range(0, 100)
						.reverse()
						.map((i) => ({
							username: 'aigamo',
							timestamp: new Date().toISOString(),
							children: `Note ${i + 1}`,
						}))}
				/>
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};

export default NoteIndex;
