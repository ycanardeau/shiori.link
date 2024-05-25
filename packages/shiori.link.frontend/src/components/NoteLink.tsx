import { AppLink } from '@/components/AppLink';
import { NoteDto } from '@/models/dto/NoteDto';
import { EuiLinkAnchorProps } from '@elastic/eui';
import { ReactElement, useMemo } from 'react';

interface NoteLinkProps extends EuiLinkAnchorProps {
	note: NoteDto;
}

export const NoteLink = ({ note, ...props }: NoteLinkProps): ReactElement => {
	const href = useMemo(() => `/notes/${note.id}`, [note]);

	return <AppLink {...props} href={href} />;
};
