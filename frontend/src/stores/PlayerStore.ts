import { action, makeObservable, observable } from 'mobx';

interface Rectangle {
	x: number;
	y: number;
	width: number;
	height: number;
}

export class PlayerStore {
	@observable playerBounds: Rectangle | undefined;

	constructor() {
		makeObservable(this);
	}

	@action setPlayerBounds(value: Rectangle | undefined): void {
		this.playerBounds = value;
	}
}
