import { AppLink } from '@/components/AppLink';
import { NoteDto } from '@/models/dto/NoteDto';
import { EuiLinkAnchorProps } from '@elastic/eui';
import React from 'react';

interface NoteLinkProps extends EuiLinkAnchorProps {
	note: NoteDto;
}

export const NoteLink = ({
	note,
	...props
}: NoteLinkProps): React.ReactElement => {
	const href = React.useMemo(() => `/notes/${note.id}`, [note]);

	return <AppLink {...props} href={href} />;
};
