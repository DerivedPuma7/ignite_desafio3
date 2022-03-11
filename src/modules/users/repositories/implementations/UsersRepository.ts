import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  //OK
  async findUserWithGamesById({user_id,}: IFindUserWithGamesDTO): Promise<any> {
    // Complete usando ORM
    const user = await this.repository.findOne(user_id, { relations:['games'] });
    return user;
  }

  //OK
  async findAllUsersOrderedByFirstName(): Promise<User[]> { 
    const query = 'SELECT * FROM users ORDER BY first_name';
    return await this.repository.query(query); // Complete usando raw query
  }

  //OK
  async findUserByFullName({first_name,last_name,}: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const query  = `
      SELECT * FROM users 
      WHERE LOWER(first_name) = LOWER('${first_name}') AND
      LOWER(last_name) = LOWER('${last_name}')
    `;

    return await this.repository.query(query); // Complete usando raw query
  }
}
