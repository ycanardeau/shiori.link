import { Collection, EntitySchema } from '@mikro-orm/core';
import { UserLogin, UserUser } from '@shiori.link/server.user.domain';

export const UserLoginSchema = new EntitySchema<UserLogin>({
	class: UserLogin,
	schema: 'user',
	tableName: 'logins',
	properties: {
		id: {
			type: 'number',
			primary: true,
		},
		createdAt: {
			type: 'datetime',
		},
		user: {
			kind: 'm:1',
			entity: (): typeof UserUser => UserUser,
			ref: true,
			inversedBy: (user): Collection<UserLogin> => user.logins,
		},
		ip: {
			type: 'string',
		},
		success: {
			type: 'boolean',
		},
	},
});
