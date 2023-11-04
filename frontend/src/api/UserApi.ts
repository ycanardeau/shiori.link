import { UserGetRequest } from '@/models/requests/UserGetRequest';
import { UserLoginRequest } from '@/models/requests/UserLoginRequest';
import { UserSignUpRequest } from '@/models/requests/UserSignUpRequest';
import { UserGetResponse } from '@/models/responses/UserGetResponse';
import { UserLoginResponse } from '@/models/responses/UserLoginResponse';
import { UserSignUpResponse } from '@/models/responses/UserSignUpResponse';
import { stringify } from 'qs';
import { Err, Ok, Result } from 'ts-results';

class UserApi {
	async get(
		request: UserGetRequest,
	): Promise<Result<UserGetResponse, Error>> {
		try {
			const response = await fetch(`/api/user/get?${stringify(request)}`);
			const json = await response.json();
			return new Ok(json);
		} catch (error) {
			if (error instanceof Error) {
				return new Err(error);
			} else {
				throw error;
			}
		}
	}

	async login(
		request: UserLoginRequest,
	): Promise<Result<UserLoginResponse, Error>> {
		try {
			const response = await fetch('/api/user/login', {
				method: 'POST',
				body: JSON.stringify(request),
			});
			const json = await response.json();
			return new Ok(json);
		} catch (error) {
			if (error instanceof Error) {
				return new Err(error);
			} else {
				throw error;
			}
		}
	}

	async signUp(
		request: UserSignUpRequest,
	): Promise<Result<UserSignUpResponse, Error>> {
		try {
			const response = await fetch('/api/user/signup', {
				method: 'POST',
				body: JSON.stringify(request),
			});
			const json = await response.json();
			return new Ok(json);
		} catch (error) {
			if (error instanceof Error) {
				return new Err(error);
			} else {
				throw error;
			}
		}
	}
}

export const userApi = new UserApi();
