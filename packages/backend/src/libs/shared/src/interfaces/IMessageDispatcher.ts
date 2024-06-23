export const IMessageDispatcher = Symbol.for('IMessageDispatcher');
export interface IMessageDispatcher {
	publish(message: string): Promise<void>;
}
