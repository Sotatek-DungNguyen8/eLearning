import { Body, Controller, Post } from '@nestjs/common'
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

  @Post('/guest/test')
  @ApiOperation({ summary: 'Create new test' })
  @ApiResponse({ status: 201, description: 'Success', type: CreateTestDto })
  async getTest(@Body() dto: CreateTestDto) {
    return await this.testService.getTest(dto.testCode)
  }
  @Post('/guest/answer')
  @ApiOperation({ summary: 'Create new test' })
  @ApiResponse({ status: 201, description: 'Success', type: ScoreDto })
  async calculationAnswer(@Body() dto: AnswerTestDto) {
    return await this.testService.calculationAnswer(dto)
  }
}
