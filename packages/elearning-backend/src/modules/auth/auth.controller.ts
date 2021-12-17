import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UsersDto } from '../users/dto/users.dto'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { LocalAuthenticationGuard } from './localAuthentication.guard'
import RequestWithUser from './dto/requestWithUser.dto'
import { ResponseAuthDto } from './dto/responseAuth.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Create new users' })
  @ApiResponse({ status: 201, description: 'Success', type: UsersDto })
  async registerUser(@Body() usersDTO: UsersDto) {
    return await this.authService.register(usersDTO)
  }

  @Post('/login')
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: AuthDto })
  async logIn(@Req() req: RequestWithUser) {
    const user: ResponseAuthDto = {
      email: req.user.email,
      token: this.authService.getJWTToken(req.user.email, req.user.role),
      role: req.user.role,
    }
    return user
  }
}
