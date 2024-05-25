import { EuiPageHeaderProps, EuiPageTemplate } from '@elastic/eui';
import { useNavigate } from 'react-router-dom';

export const AppPageTemplateHeader = ({
	breadcrumbs,
	...props
}: EuiPageHeaderProps): React.ReactElement => {
	const navigate = useNavigate();

	return (
		<EuiPageTemplate.Header
			{...props}
			breadcrumbs={breadcrumbs?.map(({ href, ...breadcrumb }) => ({
				...breadcrumb,
				onClick:
					href !== undefined
						? (e): void => {
								e.preventDefault();

								navigate(href);
							}
						: undefined,
			}))}
		/>
	);
};
