import { EuiButton } from '@elastic/eui';
import { EuiButtonPropsForAnchor } from '@elastic/eui/src/components/button/button';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppButton = ({
	href,
	...props
}: EuiButtonPropsForAnchor): ReactElement => {
	const navigate = useNavigate();

	const handleClick =
		href !== undefined
			? (e: React.MouseEvent): void => {
					e.preventDefault();

					navigate(href);
				}
			: undefined;

	return <EuiButton {...props} href={href} onClick={handleClick} />;
};
