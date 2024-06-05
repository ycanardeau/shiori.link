import { Endpoint } from '@/endpoints/Endpoint';
import {
	UserLogoutRequest,
	UserLogoutRequestSchema,
	UserLogoutResponse,
} from '@shiori.link/server.monolith.contracts';
import {
	CookieAuthenticationDefaults,
	IHttpContext,
	JsonResult,
	Ok,
	Result,
	signOut,
} from 'yohira';

export class UserLogoutEndpoint extends Endpoint<
	UserLogoutRequest,
	UserLogoutResponse
> {
	constructor() {
		super(UserLogoutRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: UserLogoutRequest,
	): Promise<Result<JsonResult<UserLogoutResponse>, Error>> {
		await signOut(
			httpContext,
			CookieAuthenticationDefaults.authenticationScheme,
			undefined,
		);

		return new Ok(new JsonResult({}));
	}
}
