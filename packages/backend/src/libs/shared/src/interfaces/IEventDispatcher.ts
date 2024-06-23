import { IEvent } from './IEvent';

export const IEventDispatcher = Symbol.for('IEventDispatcher');
export interface IEventDispatcher {
	dispatch(events: IEvent[]): Promise<void>;
	dispatch(event: IEvent): Promise<void>;
}
