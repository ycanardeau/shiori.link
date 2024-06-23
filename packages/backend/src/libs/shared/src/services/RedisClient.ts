import { Queue } from 'bullmq';

import { IQueueClient } from '../interfaces/IQueueClient';

export class RedisClient implements IQueueClient {
	private readonly queue: Queue;

	constructor() {
		this.queue = new Queue('async-queue' /* TODO */);
	}

	async sendMessage(message: string): Promise<void> {
		await this.queue.add('', message);
	}
}
