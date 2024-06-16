import { usePlayerStore } from '@/components/PlayerStoreProvider';
import { BookmarkNotePayloadDto } from '@/models/dto/NoteDto';
import { PlayQueueItemStore } from '@/stores/PlayQueueItemStore';
import { findVideoService } from '@aigamo/nostalgic-diva';
import {
	EuiButton,
	EuiButtonIcon,
	EuiFlexGroup,
	EuiFlexItem,
	EuiSpacer,
} from '@elastic/eui';
import { MoreHorizontalRegular, PlayRegular } from '@fluentui/react-icons';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { ReactElement, useCallback, useLayoutEffect, useRef } from 'react';

interface EmbedPVPreviewProps {
	payload: BookmarkNotePayloadDto;
	width?: number;
	height?: number;
	allowInline?: boolean;
}

export const EmbedPVPreview = observer(
	({
		payload,
		width = 16 * 25,
		height = 9 * 25,
		allowInline = false,
	}: EmbedPVPreviewProps): ReactElement => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const embedPVPreviewRef = useRef<HTMLDivElement>(undefined!);
		const playerStore = usePlayerStore();

		const handleResize = useCallback((): void => {
			if (!allowInline) {
				return;
			}

			if (payload.url === playerStore.playQueueStore.currentItem?.url) {
				const rect = embedPVPreviewRef.current.getBoundingClientRect();
				playerStore.setPlayerBounds({
					x: rect.x + window.scrollX,
					y: rect.y + window.scrollY,
					width: rect.width,
					height: rect.height,
				});
			} else {
				playerStore.setPlayerBounds(undefined);
			}
		}, [allowInline, payload, playerStore]);

		const handlePlay = useCallback((): void => {
			const videoService = findVideoService(payload.url);
			if (videoService === undefined) {
				return;
			}

			const videoId = videoService.extractVideoId(payload.url);
			if (videoId === undefined) {
				return;
			}

			playerStore.playQueueStore.clearAndSetItems([
				new PlayQueueItemStore(
					payload.url,
					videoService.type,
					videoId,
					payload.title,
				),
			]);

			handleResize();
		}, [playerStore, payload, handleResize]);

		useLayoutEffect(() => {
			window.addEventListener('resize', handleResize);
			handleResize();

			return (): void => {
				window.removeEventListener('resize', handleResize);
			};
		}, [handleResize]);

		useLayoutEffect(() => {
			return (): void => {
				playerStore.setPlayerBounds(undefined);
			};
		}, [playerStore]);

		useLayoutEffect(() => {
			return reaction(
				() => playerStore.playQueueStore.currentItem?.url,
				handleResize,
			);
		}, [playerStore, handleResize]);

		return (
			<>
				{false /* TODO */ && (
					<>
						<div
							css={{
								position: 'relative',
								maxWidth: width,
								maxHeight: height,
								width: '100%',
								aspectRatio: '16 / 9',
							}}
							ref={embedPVPreviewRef}
						>
							<div
								css={{
									width: '100%',
									height: '100%',
									backgroundColor: 'rbg(28, 28, 28)',
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}}
								style={{
									backgroundImage: `url(${'' /* TODO */})`,
								}}
							/>
						</div>

						<EuiSpacer size="s" />
					</>
				)}

				<EuiFlexGroup responsive={false} gutterSize="xs">
					<EuiFlexItem grow={false}>
						<EuiButton iconType={PlayRegular} onClick={handlePlay}>
							Play{/* LOC */}
						</EuiButton>
					</EuiFlexItem>
					<EuiFlexItem grow={false}>
						<EuiButtonIcon
							display="base"
							size="m"
							iconType={MoreHorizontalRegular}
						/>
					</EuiFlexItem>
				</EuiFlexGroup>
			</>
		);
	},
);
