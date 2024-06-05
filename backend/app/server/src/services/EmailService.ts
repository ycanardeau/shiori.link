export const IEmailService = Symbol.for('IEmailService');
export interface IEmailService {
	normalizeEmail(email: string): Promise<string>;
}

export class EmailService implements IEmailService {
	normalizeEmail(email: string): Promise<string> {
		// TODO
		//throw new Error('Method not implemented.');
		return Promise.resolve(email);
	}
}
