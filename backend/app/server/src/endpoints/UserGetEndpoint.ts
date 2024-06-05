import { DataNotFoundError } from '@/errors/DataNotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toUserDto } from '@/mappers/UserMapper';
import { UserDto } from '@/models/dto/UserDto';
import {
	UserGetRequest,
	UserGetRequestSchema,
} from '@/models/requests/UserGetRequest';
import { UserGetResponse } from '@/models/responses/UserGetResponse';
import { Endpoint } from '@/endpoints/Endpoint';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { Err, IHttpContext, JsonResult, Ok, Result, inject } from 'yohira';

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
		Result<JsonResult<UserDto>, UnauthorizedError | DataNotFoundError>
	> {
		const currentUser = await this.currentUserService.getCurrentUser(
			httpContext,
		);

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
