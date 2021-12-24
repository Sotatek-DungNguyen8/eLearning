import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { TestService } from './test.service'
import { CreateTestDto } from './dto/create-test.dto'
import { AnswerTestDto } from './dto/answer-test.dto'
import { ScoreDto } from './dto/score.dto'
import { TestCodeDto } from './dto/testCode.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import RoleGuard from '../auth/role.guard'
import Role from '../users/role.enum'
import { AnswerTestUserDto } from './dto/answer-user.dto'

@ApiTags('test')
@ApiBearerAuth()
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @ApiOperation({ summary: 'Create new test' })
  @ApiResponse({ status: 201, description: 'Success', type: CreateTestDto })
  async createOrder(@Body() dto: CreateTestDto) {
    return await this.testService.create(dto)
  }

  @Post()
  @ApiOperation({ summary: 'get All test' })
  @ApiResponse({ status: 201, description: 'Success', type: [CreateTestDto] })
  async getAllTest() {
    return await this.testService.getAll()
  }

  @Post('/test/guest')
  @ApiOperation({ summary: 'Create new test' })
  @ApiResponse({ status: 201, description: 'Success', type: CreateTestDto })
  async getTest(@Body() dto: TestCodeDto) {
    return await this.testService.getTest(dto.testCode)
  }

  @Post('/test/user')
  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get random test' })
  @ApiResponse({ status: 201, description: 'Success', type: CreateTestDto })
  async getUserTest() {
    return await this.testService.getTestRandom()
  }

  @Post('/answer/guest')
  @ApiOperation({ summary: 'Create new test' })
  @ApiResponse({ status: 201, description: 'Success', type: ScoreDto })
  async calculationAnswer(@Body() dto: AnswerTestDto) {
    return await this.testService.calculationAnswer(dto)
  }

  @Post('/answer/user')
  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Canculation test' })
  @ApiResponse({ status: 201, description: 'Success', type: AnswerTestUserDto })
  async calculationAnswerUser(@Req() req, @Body() dto: AnswerTestDto) {
    return await this.testService.calculationAnswerUser(req.user.email, dto)
  }
}
