import { noteApi } from '@/api/NoteApi';
import { NoteLink } from '@/components/NoteLink';
import { NoteMarkdownFormat } from '@/components/NoteMarkdownFormat';
import { NoteDataDto, NoteDto } from '@/models/dto/NoteDto';
import { NoteType } from '@/models/enums/NoteType';
import {
	EuiAvatar,
	EuiButtonEmpty,
	EuiButtonIcon,
	EuiComment,
	EuiContextMenuItem,
	EuiContextMenuPanel,
	EuiIcon,
	EuiPopover,
	EuiText,
} from '@elastic/eui';
import { DeleteRegular, MoreHorizontalFilled } from '@fluentui/react-icons';
import React from 'react';

interface NoteCommentActionsProps {
	note: NoteDto;
	onDelete: (note: NoteDto) => void;
}

const NoteCommentActions = React.memo(
	({ note, onDelete }: NoteCommentActionsProps): React.ReactElement => {
		const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

		const togglePopover = (): void => setIsPopoverOpen(!isPopoverOpen);

		const closePopover = (): void => setIsPopoverOpen(false);

		return (
			<EuiPopover
				button={
					<EuiButtonIcon
						iconType={MoreHorizontalFilled}
						size="xs"
						color="text"
						onClick={togglePopover}
					/>
				}
				isOpen={isPopoverOpen}
				closePopover={togglePopover}
				panelPaddingSize="none"
				anchorPosition="leftCenter"
			>
				<EuiContextMenuPanel
					items={[
						<EuiContextMenuItem
							icon={<EuiIcon type={DeleteRegular} />}
							onClick={async (): Promise<void> => {
								closePopover();

								const result = await noteApi.delete({
									noteId: note.id,
								});

								if (result.ok) {
									onDelete(note);
								}
							}}
						>
							Delete{/* LOC */}
						</EuiContextMenuItem>,
					]}
				/>
			</EuiPopover>
		);
	},
);

interface NoteCommentBodyProps {
	data: NoteDataDto;
}

const NoteCommentBody = React.memo(
	({ data }: NoteCommentBodyProps): React.ReactElement => {
		switch (data.type) {
			case NoteType.Bookmark:
				return (
					<EuiButtonEmpty
						href={data.url}
						target="_blank"
						iconType={`https://www.google.com/s2/favicons?domain=${
							new URL(data.url).hostname
						}&sz=${16}`}
					>
						{data.title || data.url}
					</EuiButtonEmpty>
				);

			case NoteType.Markdown:
				return <NoteMarkdownFormat>{data.text}</NoteMarkdownFormat>;

			// TODO: remove
			default:
				return <EuiText>{JSON.stringify(data)}</EuiText>;
		}
	},
);

interface NoteCommentProps {
	note: NoteDto;
	onDelete: (note: NoteDto) => void;
}

export const NoteComment = React.memo(
	({ note, onDelete }: NoteCommentProps): React.ReactElement => {
		return (
			<EuiComment
				username={note.user.userName}
				timelineAvatar={
					<EuiAvatar
						name={note.user.userName}
						imageUrl={note.user.avatarUrl}
					/>
				}
				timestamp={
					<NoteLink
						note={note}
						color="text"
						style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
					>
						{note.createdAt}
					</NoteLink>
				}
				actions={<NoteCommentActions note={note} onDelete={onDelete} />}
			>
				<NoteCommentBody data={note.data} />
			</EuiComment>
		);
	},
);
