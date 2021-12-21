import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { QuestionService } from './question.service'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateQuestion } from './dto/create-question.dto'

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiOperation({ summary: 'Create new question' })
  @ApiResponse({ status: 201, description: 'Success', type: CreateQuestion })
  async createQuestion(@Body() dto: CreateQuestion) {
    return await this.questionService.create(dto)
  }
  @Post('/createMany/')
  @ApiOperation({ summary: 'Create many new question' })
  @ApiResponse({ status: 201, description: 'Success', type: [CreateQuestion] })
  async createManyQuestion(@Body() dto: CreateQuestion[]) {
    return await this.questionService.createMany(dto)
  }
  @Get('')
  @ApiOperation({ summary: 'Get all new question' })
  @ApiResponse({ status: 200, description: 'Success', type: [CreateQuestion] })
  async getAll() {
    return await this.questionService.getAll()
  }
  @Put('/:id/update')
  @ApiOperation({ summary: 'Update question' })
  @ApiResponse({ status: 201, description: 'Success', type: CreateQuestion })
  async updateQuestion(@Param('id') id: string, @Body() dto: CreateQuestion) {
    return await this.questionService.updateQuestion(id, dto)
  }
  @Delete('/:id')
  @ApiOperation({ summary: 'Create many new question' })
  @ApiResponse({ status: 201, description: 'Success', type: 'Delete success' })
  async delete(@Param('id') id: string) {
    return await this.questionService.deleteQuestion(id)
  }
}
