import { User } from '@/entities/User';
import { Ref } from '@mikro-orm/core';

export interface IUserOwnedEntity {
	user: Ref<User>;
}
