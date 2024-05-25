import { EuiPageHeaderProps, EuiPageTemplate } from '@elastic/eui';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppPageTemplateHeader = ({
	breadcrumbs,
	...props
}: EuiPageHeaderProps): ReactElement => {
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
