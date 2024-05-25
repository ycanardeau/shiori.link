import {
	UserLogoutRequest,
	UserLogoutRequestSchema,
} from '@/models/requests/UserLogoutRequest';
import { UserLogoutResponse } from '@/models/responses/UserLogoutResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import {
	CookieAuthenticationDefaults,
	IHttpContext,
	Ok,
	Result,
	signOut,
} from 'yohira';

export class UserLogoutHandler extends RequestHandler<
	UserLogoutRequest,
	UserLogoutResponse
> {
	constructor() {
		super(UserLogoutRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: UserLogoutRequest,
	): Promise<Result<UserLogoutResponse, Error>> {
		await signOut(
			httpContext,
			CookieAuthenticationDefaults.authenticationScheme,
			undefined,
		);

		return new Ok({});
	}
}
