import { usePlayer } from '@/components/PlayerProvider';
import {
	EuiButton,
	EuiButtonIcon,
	EuiFlexGroup,
	EuiFlexItem,
	EuiSpacer,
} from '@elastic/eui';
import { MoreHorizontalRegular, PlayRegular } from '@fluentui/react-icons';
import { observer } from 'mobx-react-lite';
import React from 'react';

interface EmbedPVPreviewProps {
	width?: number;
	height?: number;
	allowInline?: boolean;
}

export const EmbedPVPreview = observer(
	({
		width = 16 * 25,
		height = 9 * 25,
		allowInline = true,
	}: EmbedPVPreviewProps): React.ReactElement => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const embedPVPreviewRef = React.useRef<HTMLDivElement>(undefined!);
		const player = usePlayer();

		const handleResize = React.useCallback((): void => {
			if (!allowInline) {
				return;
			}

			if (false /* TODO */) {
				const rect = embedPVPreviewRef.current.getBoundingClientRect();
				player.setPlayerBounds({
					x: rect.x + window.scrollX,
					y: rect.y + window.scrollY,
					width: rect.width,
					height: rect.height,
				});
			} else {
				player.setPlayerBounds(undefined);
			}
		}, [allowInline, player]);

		const handlePlay = React.useCallback((): void => {
			handleResize();
		}, [handleResize]);

		React.useLayoutEffect(() => {
			window.addEventListener('resize', handleResize);
			handleResize();

			return (): void => {
				window.removeEventListener('resize', handleResize);
			};
		}, [handleResize]);

		React.useLayoutEffect(() => {
			return (): void => {
				player.setPlayerBounds(undefined);
			};
		}, [player]);

		React.useLayoutEffect(() => {
			// TODO
		}, []);

		return (
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
							backgroundImage: `url(${
								'https://source.unsplash.com/400x200/?Nature' /* TODO */
							})`,
						}}
					/>
				</div>

				<EuiSpacer size="s" />

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
