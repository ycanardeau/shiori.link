import { PlayQueueStore } from '@/stores/PlayQueueStore';
import { action, makeObservable, observable } from 'mobx';

interface Rectangle {
	x: number;
	y: number;
	width: number;
	height: number;
}

export class PlayerStore {
	readonly playQueueStore = new PlayQueueStore();
	@observable playerBounds: Rectangle | undefined;

	constructor() {
		makeObservable(this);
	}

	@action setPlayerBounds(value: Rectangle | undefined): void {
		this.playerBounds = value;
	}
}
