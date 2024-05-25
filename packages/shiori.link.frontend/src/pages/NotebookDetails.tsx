import { notebookApi } from '@/api/NotebookApi';
import { useProgressBar } from '@/components/useProgressBar';
import { NotebookDto } from '@/models/dto/NotebookDto';
import { EuiPageTemplate } from '@elastic/eui';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface NotebookDetailsPageTemplateProps {
	notebook: NotebookDto;
}

const NotebookDetailsPageTemplate = ({
	notebook,
}: NotebookDetailsPageTemplateProps): React.ReactElement => {
	const navigate = useNavigate();

	return (
		<>
			<EuiPageTemplate.Header
				pageTitle={notebook.name}
				rightSideItems={[]}
				breadcrumbs={[
					{
						href: '/notebooks',
						onClick: (e): void => {
							e.preventDefault();

							navigate('/notebooks');
						},
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

const NotebookDetails = (): React.ReactElement => {
	const { id } = useParams();

	const [notebook, setNotebook] = React.useState<NotebookDto>();

	const [, setLoading] = useProgressBar();
	React.useEffect(() => {
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
