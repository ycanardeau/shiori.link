export interface IEventSubscriberMeta<T = any> {
	name: string;
	method: keyof T & string;
}

export const IEventSubscriber = Symbol.for('IEventSubscriber');
export interface IEventSubscriber {
	getSubscribedEvents(): IEventSubscriberMeta[];
}
