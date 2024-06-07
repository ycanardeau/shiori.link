import { User } from '@shiori.link/server.module1.domain';
import { IHttpContext } from '@yohira/app';

export const ICurrentUserService = Symbol.for('ICurrentUserService');
export interface ICurrentUserService {
	getCurrentUser(httpContext: IHttpContext): Promise<User | undefined>;
}
