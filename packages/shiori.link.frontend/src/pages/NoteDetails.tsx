import { noteApi } from '@/api/NoteApi';
import { AppPageTemplateHeader } from '@/components/AppPageTemplateHeader';
import { NoteComment } from '@/components/NoteComment';
import { useProgressBar } from '@/components/useProgressBar';
import { NoteDto } from '@/models/dto/NoteDto';
import { EuiPageTemplate } from '@elastic/eui';
import React from 'react';
import { useParams } from 'react-router-dom';

interface NoteDetailsPageTemplateProps {
	note: NoteDto;
}

const NoteDetailsPageTemplate = ({
	note,
}: NoteDetailsPageTemplateProps): React.ReactElement => {
	return (
		<>
			<AppPageTemplateHeader
				pageTitle={`Note ${note.id}` /* LOC */}
				rightSideItems={[]}
				breadcrumbs={[
					{
						href: '/notes',
						text: 'Notes' /* LOC */,
					},
					{
						text: `Note ${note.id}`,
					},
				]}
			/>

			<EuiPageTemplate.Section>
				<NoteComment note={note} />
			</EuiPageTemplate.Section>
		</>
	);
};

const NoteDetails = (): React.ReactElement => {
	const { id } = useParams();

	const [note, setNote] = React.useState<NoteDto>();

	const [, setLoading] = useProgressBar();
	React.useEffect(() => {
		setLoading(true);

		noteApi.get({ id: Number(id) }).then((result) => {
			if (result.ok) {
				setNote(result.val);

				setLoading(false);
			}
		});
	}, [id, setLoading]);

	return note ? <NoteDetailsPageTemplate note={note} /> : <></>;
};

export default NoteDetails;
