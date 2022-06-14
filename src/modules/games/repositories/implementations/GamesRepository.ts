import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const query = `SELECT * FROM GAMES WHERE title ILIKE '%${param}%'`;
    return await this.repository.query(query); // Complete usando raw query
  }

  //OK
  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query('select count(*) from games'); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users = await this.repository
    .createQueryBuilder('users')
    .select('users.*')
    .from('users', 'users')
    // .innerJoin('users_games_games', 'users_games_games', 'users_games_games.gamesId = games.id')
    // .innerJoin('users', 'users', 'users.id = users_games_games.usersId')
    .where('games.id = :game_id', {game_id: id})
    // .getSql();
    .getMany();

    console.log(users);

    return [];
      // Complete usando query builder
  }
}
