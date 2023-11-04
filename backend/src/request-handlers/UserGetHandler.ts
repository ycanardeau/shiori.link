import { NotFoundError } from '@/errors/NotFoundError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { toUserDto } from '@/mappers/UserMapper';
import { UserDto } from '@/models/dto/UserDto';
import {
	UserGetRequest,
	UserGetRequestSchema,
} from '@/models/requests/UserGetRequest';
import { UserGetResponse } from '@/models/responses/UserGetResponse';
import { RequestHandler } from '@/request-handlers/RequestHandler';
import { ICurrentUserService } from '@/services/CurrentUserService';
import { Err, IHttpContext, Ok, Result, inject } from 'yohira';

export class UserGetHandler extends RequestHandler<
	UserGetRequest,
	UserGetResponse
> {
	constructor(
		@inject(ICurrentUserService)
		private readonly currentUserService: ICurrentUserService,
	) {
		super(UserGetRequestSchema);
	}

	async handle(
		httpContext: IHttpContext,
		request: UserGetRequest,
	): Promise<Result<UserDto, UnauthorizedError | NotFoundError>> {
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

		return new Ok(userDto);
	}
}
