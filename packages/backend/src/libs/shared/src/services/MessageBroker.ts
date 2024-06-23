import { inject } from 'yohira';

import { IMessageBroker } from '../interfaces/IMessageBroker';
import { IMessageDispatcher } from '../interfaces/IMessageDispatcher';

export class MessageBroker implements IMessageBroker {
	constructor(
		@inject(IMessageDispatcher)
		private readonly messageDispatcher: IMessageDispatcher,
	) {}

	publish<TMessage extends object>(message: TMessage): Promise<void> {
		return this.messageDispatcher.publish(JSON.stringify(message));
	}
}
