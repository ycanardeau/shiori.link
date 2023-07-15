import { NoteDto } from '@/models/responses/NoteDto';
import { EuiLink, EuiLinkAnchorProps } from '@elastic/eui';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NoteLinkProps extends EuiLinkAnchorProps {
	note: NoteDto;
}

export const NoteLink = ({
	note,
	...props
}: NoteLinkProps): React.ReactElement => {
	const href = React.useMemo(() => `/notes/${note.id}`, [note]);

	const navigate = useNavigate();

	const handleClick = React.useCallback(
		(e): void => {
			e.preventDefault();

			navigate(href);
		},
		[href, navigate],
	);

	return <EuiLink {...props} href={href} onClick={handleClick} />;
};
