import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UsersRepository } from './repository/users.repository'
import { Users, UsersDocument } from './entity/users.entity'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(users: Users): Promise<UsersDocument> {
    return this.usersRepository.create(users)
  }

  public async getAll(): Promise<UsersDocument[]> {
    return this.usersRepository.getAll()
  }

  public async getByEmail(email: string) {
    const user = await this.usersRepository.getOne({
      conditions: { email: email },
    })
    if (user) {
      return user
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    )
  }

  public async getRole(email: string) {
    const user = await this.usersRepository.getOne({
      conditions: { email: email },
    })
    if (user) {
      return user.role
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    )
  }
}
