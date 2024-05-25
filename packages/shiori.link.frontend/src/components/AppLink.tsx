import { EuiLink, EuiLinkProps } from '@elastic/eui';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppLink = ({ href, ...props }: EuiLinkProps): ReactElement => {
	const navigate = useNavigate();

	const handleClick =
		href !== undefined
			? (e: React.MouseEvent): void => {
					e.preventDefault();

					navigate(href);
				}
			: undefined;

	return <EuiLink {...props} onClick={handleClick} />;
};
