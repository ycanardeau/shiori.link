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
}

export const EmbedPVPreview = observer(
	({
		width = 16 * 25,
		height = 9 * 25,
	}: EmbedPVPreviewProps): React.ReactElement => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const embedPVPreviewRef = React.useRef<HTMLDivElement>(undefined!);

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
						<EuiButton iconType={PlayRegular}>
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
