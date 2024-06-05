import { PasswordHashAlgorithm } from '@shiori.link/server.monolith.domain';

export interface IPasswordService {
	readonly algorithm: PasswordHashAlgorithm;
	generateSalt(): Promise<string>;
	hashPassword(password: string, salt: string): Promise<string>;
}

export const IPasswordServiceFactory = Symbol.for('IPasswordServiceFactory');
export interface IPasswordServiceFactory {
	readonly default: IPasswordService;
	create(algorithm: PasswordHashAlgorithm): IPasswordService;
}
