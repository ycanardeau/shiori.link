import { bottomBarHeight } from '@/components/BottomBar';
import { PlayQueueStore, RepeatMode } from '@/stores/PlayQueueStore';
import { PlayerStore } from '@/stores/PlayerStore';
import {
	NostalgicDiva,
	PlayerOptions,
	useNostalgicDiva,
} from '@aigamo/nostalgic-diva';
import { observer } from 'mobx-react-lite';
import { ReactElement, useCallback, useMemo } from 'react';

export const miniPlayerSize = {
	width: 16 * 25,
	height: 9 * 25,
} as const;

interface MiniPlayerProps {
	playerStore: PlayerStore;
	playQueueStore: PlayQueueStore;
}

export const MiniPlayer = observer(
	({ playerStore, playQueueStore }: MiniPlayerProps): ReactElement => {
		const diva = useNostalgicDiva();

		const handleLoaded = useCallback(async (): Promise<void> => {
			if (!playQueueStore.interacted) {
				return;
			}

			await diva.play();
		}, [playQueueStore, diva]);

		const handleEnded = useCallback(async (): Promise<void> => {
			switch (playQueueStore.repeat) {
				case RepeatMode.One:
					await diva.setCurrentTime(0);
					break;

				case RepeatMode.Off:
				case RepeatMode.All:
					if (playQueueStore.isLastItem) {
						switch (playQueueStore.repeat) {
							case RepeatMode.Off:
								playerStore.onEnded();
								break;

							case RepeatMode.All:
								if (playQueueStore.hasMultipleItems) {
									await playQueueStore.goToFirst();
								} else {
									await diva.setCurrentTime(0);
								}
								break;
						}
					} else {
						await playQueueStore.next();
					}
					break;
			}
		}, [playQueueStore, playerStore, diva]);

		const options = useMemo(
			(): PlayerOptions => ({
				onLoaded: handleLoaded,
				onPlay: playerStore.onPlay,
				onPause: playerStore.onPause,
				onEnded: handleEnded,
				onTimeUpdate: playerStore.onTimeUpdate,
			}),
			[playerStore, handleLoaded, handleEnded],
		);

		return (
			<div
				css={{
					backgroundColor: 'rgb(39, 39, 39)',
					display: 'flex',
					flexDirection: 'column',
					...(playerStore.playerBounds === undefined
						? {
								position: 'fixed',
								right: 0,
								bottom: bottomBarHeight,
								width: miniPlayerSize.width,
								height: miniPlayerSize.height,
								zIndex: 998,
							}
						: {
								position: 'absolute',
								left: playerStore.playerBounds.x,
								top: playerStore.playerBounds.y,
								bottom: bottomBarHeight,
								width: miniPlayerSize.width,
								height: miniPlayerSize.height,
								zIndex: 998,
							}),
				}}
			>
				<div css={{ flexGrow: 1, backgroundColor: 'black' }}>
					{playerStore.playQueueStore.currentItem && (
						<NostalgicDiva
							src={playerStore.playQueueStore.currentItem.url}
							options={options}
						/>
					)}
				</div>
			</div>
		);
	},
);
