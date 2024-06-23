export const IMessageBroker = Symbol.for('IMessageBroker');
export interface IMessageBroker {
	publish<TMessage extends object>(message: TMessage): Promise<void>;
}
