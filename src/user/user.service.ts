import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_PROVIDER } from '../database/knex';
import { CreateUserDto, ListUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(@Inject(KNEX_PROVIDER) private readonly knex: Knex) {}

  getUser(id: number) {
    return this.knex('user').select('*').where({ id });
  }

  getUserByEmail(email: string) {
    return this.knex('user').select('*').where({ email }).first();
  }

  listUser(payload: ListUserDto) {
    const sql = this.knex('user')
      .select(['id', 'email', 'name'])
      .limit(payload.limit)
      .offset(payload.limit * payload.page);

    if (!payload.search)
      return sql;

    return sql
      .whereILike('email', payload.search)
      .orWhereILike('name', payload.search);
  }

  async createUser(user: CreateUserDto) {
    const [id] = await this.knex('user').insert(user);
    return this.getUser(id);
  }

  updateUser(id: number, payload: UpdateUserDto) {
    return this.knex('user')
      .where({ id })
      .update(payload);
  }

  deleteUser(id: number) {
    return this.knex('user')
      .where({ id })
      .delete();
  }
}
