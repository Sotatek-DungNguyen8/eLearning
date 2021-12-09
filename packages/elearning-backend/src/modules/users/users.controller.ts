import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersDto } from './dto/users.dto'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import RoleGuard from '../auth/role.guard'
import Role from './role.enum'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new users' })
  @ApiResponse({ status: 201, description: 'Success', type: UsersDto })
  async createOrder(@Body() usersDTO: UsersDto) {
    return await this.usersService.create(usersDTO)
  }

  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return await this.usersService.getAll()
  }
}
