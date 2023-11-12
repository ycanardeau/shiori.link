import { usePlayer } from '@/components/PlayerProvider';
import { observer } from 'mobx-react-lite';
import React from 'react';

const bottomBarHeight = 0;

const miniPlayerSize = {
	width: 16 * 25,
	height: 9 * 25,
} as const;

export const MiniPlayer = observer((): React.ReactElement => {
	return (
		<div
			css={{
				position: 'fixed',
				right: 0,
				bottom: bottomBarHeight,
				width: miniPlayerSize.width,
				height: miniPlayerSize.height,
				zIndex: 998,
				backgroundColor: 'rgb(39, 39, 39)',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<div css={{ flexGrow: 1, backgroundColor: 'black' }}></div>
		</div>
	);
});

export const Player = observer((): React.ReactElement => {
	const player = usePlayer();

	return <>{!player.playQueue.isEmpty && <MiniPlayer />}</>;
});
