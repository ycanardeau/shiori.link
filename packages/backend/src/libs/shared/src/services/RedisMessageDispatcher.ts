import { inject } from 'yohira';

import { IMessageDispatcher } from '../interfaces/IMessageDispatcher';
import { IQueueClient } from '../interfaces/IQueueClient';

export class RedisMessageDispatcher implements IMessageDispatcher {
	constructor(
		@inject(IQueueClient) private readonly queueClient: IQueueClient,
	) {}

	publish(message: string): Promise<void> {
		return this.queueClient.sendMessage(message);
	}
}
