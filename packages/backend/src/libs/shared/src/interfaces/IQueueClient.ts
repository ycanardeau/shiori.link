export const IQueueClient = Symbol.for('IQueueClient');
export interface IQueueClient {
	sendMessage(message: string): Promise<void>;
}
