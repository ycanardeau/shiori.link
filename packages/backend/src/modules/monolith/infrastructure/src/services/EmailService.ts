import { IEmailService } from '@shiori.link/server.monolith.application';

export class EmailService implements IEmailService {
	normalizeEmail(email: string): Promise<string> {
		// TODO
		//throw new Error('Method not implemented.');
		return Promise.resolve(email);
	}
}
