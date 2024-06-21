export const IEmailService = Symbol.for('IEmailService');
export interface IEmailService {
	normalizeEmail(email: string): Promise<string>;
}
