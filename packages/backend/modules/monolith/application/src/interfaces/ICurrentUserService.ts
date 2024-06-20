import { User } from '@shiori.link/server.monolith.domain';
import { IHttpContext } from 'yohira';

export const ICurrentUserService = Symbol.for('ICurrentUserService');
export interface ICurrentUserService {
	getCurrentUser(httpContext: IHttpContext): Promise<User | undefined>;
}
