import { ILogger, ILoggerFactory, inject, LogLevel } from 'yohira';

import { IEvent } from '../interfaces/IEvent';
import { IEventDispatcher } from '../interfaces/IEventDispatcher';
import { IEventSubscriber } from '../interfaces/IEventSubscriber';

interface Subscriber {
	name: string;
	subscriber: (event: IEvent) => Promise<void>;
}

export class InMemoryEventDispatcher implements IEventDispatcher {
	private readonly logger: ILogger;

	private readonly subscribers: Subscriber[] = [];

	private addSubscriber(subscriber: IEventSubscriber): void {
		if (subscriber.getSubscribedEvents().length === 0) {
			return;
		}

		const subscribers = subscriber
			.getSubscribedEvents()
			.map(({ name, method }) => ({
				name: name,
				subscriber: (subscriber as any)[method].bind(subscriber),
			}));

		this.subscribers.push(...subscribers);
	}

	private addSubscribers(subscribers: IEventSubscriber[]): void {
		subscribers.forEach((subscriber) => this.addSubscriber(subscriber));
	}

	constructor(
		@inject(ILoggerFactory) loggerFactory: ILoggerFactory,
		@inject(Symbol.for('Iterable<IEventSubscriber>'))
		eventSubscribers: IEventSubscriber[],
	) {
		this.logger = loggerFactory.createLogger(InMemoryEventDispatcher.name);

		this.addSubscribers(eventSubscribers);
	}

	dispatch(events: IEvent[]): Promise<void>;
	dispatch(event: IEvent): Promise<void>;
	async dispatch(event: IEvent | IEvent[]): Promise<void> {
		const events = event instanceof Array ? event : [event];

		const eventNames = events.map((e) => e.name);

		const promises = this.subscribers
			.filter((s) => eventNames.includes(s.name))
			.map(async ({ name: eventName, subscriber }) => {
				const subscribedEvent = events.find(
					(e) => e.name === eventName,
				);

				if (subscribedEvent === undefined) {
					throw new Error(
						`There is no subscriber for ${eventName} event`,
					);
				}

				try {
					await subscriber(subscribedEvent);
				} catch (error) {
					this.logger.log(
						LogLevel.Debug,
						`Subscriber failed to handle event ${eventName}`,
					);
				}
			});

		if (promises.length) {
			this.logger.log(
				LogLevel.Debug,
				`Dispatching events ${eventNames.join(', ')}@${JSON.stringify(events)}`,
			);
		}

		await Promise.all(promises);
	}
}
