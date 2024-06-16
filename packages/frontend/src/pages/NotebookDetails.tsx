import { notebookApi } from '@/api/NotebookApi';
import { AppPageTemplateHeader } from '@/components/AppPageTemplateHeader';
import { useProgressBar } from '@/components/useProgressBar';
import { NotebookDto } from '@/models/dto/NotebookDto';
import { EuiPageTemplate } from '@elastic/eui';
import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface NotebookDetailsPageTemplateProps {
	notebook: NotebookDto;
}

const NotebookDetailsPageTemplate = ({
	notebook,
}: NotebookDetailsPageTemplateProps): ReactElement => {
	return (
		<>
			<AppPageTemplateHeader
				pageTitle={notebook.name}
				rightSideItems={[]}
				breadcrumbs={[
					{
						href: '/notebooks',
						text: 'Notebooks' /* LOC */,
					},
					{
						text: notebook.name,
					},
				]}
			/>

			<EuiPageTemplate.Section></EuiPageTemplate.Section>
		</>
	);
};

const NotebookDetails = (): ReactElement => {
	const { id } = useParams();

	const [notebook, setNotebook] = useState<NotebookDto>();

	const [, setLoading] = useProgressBar();
	useEffect(() => {
		setLoading(true);

		notebookApi.get({ id: Number(id) }).then((result) => {
			if (result.ok) {
				setNotebook(result.val);

				setLoading(false);
			}
		});
	}, [id, setLoading]);

	return notebook ? (
		<NotebookDetailsPageTemplate notebook={notebook} />
	) : (
		<></>
	);
};

export default NotebookDetails;
