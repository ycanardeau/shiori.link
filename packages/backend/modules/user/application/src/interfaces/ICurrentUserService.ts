import { UserUser } from '@shiori.link/server.user.domain';
import { IHttpContext } from 'yohira';

export const ICurrentUserService = Symbol.for('ICurrentUserService');
export interface ICurrentUserService {
	getCurrentUser(httpContext: IHttpContext): Promise<UserUser | undefined>;
}
