import {
	UserLogoutRequest,
	UserLogoutRequestSchema,
} from '@/models/requests/UserLogoutRequest';
import { UserLogoutResponse } from '@/models/responses/UserLogoutResponse';
import { Endpoint } from '@/endpoints/Endpoint';
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
