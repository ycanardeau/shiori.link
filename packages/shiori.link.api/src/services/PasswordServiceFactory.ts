import { PasswordHashAlgorithm } from '@/entities/User';
import { genSalt, hash } from 'bcryptjs';

interface IPasswordService {
	readonly algorithm: PasswordHashAlgorithm;
	generateSalt(): Promise<string>;
	hashPassword(password: string, salt: string): Promise<string>;
}

class BcryptPasswordService implements IPasswordService {
	readonly algorithm = PasswordHashAlgorithm.Bcrypt;

	generateSalt(): Promise<string> {
		return genSalt(10);
	}

	hashPassword(password: string, salt: string): Promise<string> {
		// TODO: bcrypt has a maximum length input length of 72 bytes.
		if (new TextEncoder().encode(password).length > 72) {
			throw new Error('Password is too long.');
		}

		return hash(password, salt);
	}
}

export const IPasswordServiceFactory = Symbol.for('IPasswordServiceFactory');
export interface IPasswordServiceFactory {
	readonly default: IPasswordService;
	create(algorithm: PasswordHashAlgorithm): IPasswordService;
}

export class PasswordServiceFactory implements IPasswordServiceFactory {
	create(algorithm: PasswordHashAlgorithm): IPasswordService {
		switch (algorithm) {
			case PasswordHashAlgorithm.Bcrypt:
				return new BcryptPasswordService();
		}
	}

	get default(): IPasswordService {
		return this.create(PasswordHashAlgorithm.Bcrypt);
	}
}
