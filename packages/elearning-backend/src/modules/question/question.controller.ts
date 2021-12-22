import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { QuestionService } from './question.service'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateQuestion } from './dto/create-question.dto'
import RoleGuard from '../auth/role.guard'
import Role from '../users/role.enum'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { GetQuestionResponseDto } from './dto/get-question.response.dto'

@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create new question' })
  @ApiResponse({ status: 201, description: 'Success', type: CreateQuestion })
  async createQuestion(@Body() dto: CreateQuestion) {
    return await this.questionService.create(dto)
  }

  @Post('/createMany/')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create many new question' })
  @ApiBody({ type: [CreateQuestion] })
  @ApiResponse({ status: 201, description: 'Success', type: [CreateQuestion] })
  async createManyQuestion(@Body() dto: CreateQuestion[]) {
    return await this.questionService.createMany(dto)
  }

  @Get('')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all new question' })
  @ApiResponse({ status: 200, description: 'Success', type: [CreateQuestion] })
  async getAll() {
    return await this.questionService.getAll()
  }

  @Get('/:id')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get question by id' })
  @ApiResponse({ status: 200, description: 'Success', type: CreateQuestion })
  async getById(@Param('id') id: string) {
    return await this.questionService.getById(id)
  }

  @Get('/test-question/:id')
  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get question by id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: GetQuestionResponseDto,
  })
  async getByIdForTest(@Param('id') id: string) {
    return await this.questionService.getByIdForTest(id)
  }
  @Get('/type')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get question by type' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: GetQuestionResponseDto,
  })
  async getByType(@Body() dto: CreateQuestion) {
    return await this.questionService.getByIdForTest(dto.questionType)
  }

  @Put('/:id/update')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update question' })
  @ApiResponse({ status: 201, description: 'Success', type: CreateQuestion })
  async updateQuestion(@Param('id') id: string, @Body() dto: CreateQuestion) {
    return await this.questionService.updateQuestion(id, dto)
  }
  @Delete('/:id')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create many new question' })
  @ApiResponse({ status: 201, description: 'Success', type: 'Delete success' })
  async delete(@Param('id') id: string) {
    return await this.questionService.deleteQuestion(id)
  }
}
