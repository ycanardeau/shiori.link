import { ICurrentUserService } from '@shiori.link/server.user.application';
import {
	UserGetRequest,
	UserGetRequestSchema,
	UserGetResponse,
} from '@shiori.link/server.user.contracts';
import { Err, IHttpContext, inject, JsonResult, Ok, Result } from 'yohira';

import { DataNotFoundError } from '../errors/DataNotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { toUserDto } from '../mappers/UserMapper';
import { Endpoint } from './Endpoint';

export class UserGetEndpoint extends Endpoint<UserGetRequest, UserGetResponse> {
	constructor(
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
	) {
		super(UserGetRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: UserGetRequest,
	): Promise<
		Result<
			JsonResult<UserGetResponse>,
			UnauthorizedError | DataNotFoundError
		>
	> {
		const currentUser =
			await this.currentUserService.getCurrentUser(httpContext);

		if (!currentUser) {
			return new Err(new UnauthorizedError());
		}

		const userDtoResult = toUserDto(currentUser);

		if (userDtoResult.err) {
			return userDtoResult;
		}

		const userDto = userDtoResult.val;

		return new Ok(new JsonResult(userDto));
	}
}
