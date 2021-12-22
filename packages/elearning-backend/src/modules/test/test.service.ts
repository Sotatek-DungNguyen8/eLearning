import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { TestRepository } from './repository/test.repository'
import { CreateTestDto } from './dto/create-test.dto'
import { TestDocument } from './entity/test.entity'
import { QuestionService } from '../question/question.service'
import { AnswerTestDto } from './dto/answer-test.dto'

@Injectable()
export class TestService {
  constructor(
    private readonly testRepository: TestRepository,
    private readonly questionService: QuestionService,
  ) {}
  public async create(dto: CreateTestDto): Promise<TestDocument> {
    const question = dto.questionCode
    const check = await this.questionService.checkQuestion(question)
    const length = dto.questionCode.length
    if (length > dto.numberQuestion) {
      throw new HttpException(
        'You insert more question than your question',
        HttpStatus.BAD_REQUEST,
      )
    }
    if (length !== check) {
      throw new HttpException(
        'You insert wrong question id',
        HttpStatus.BAD_REQUEST,
      )
    }
    try {
      return this.testRepository.create(dto)
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }
  }

  public async getAll(): Promise<TestDocument[]> {
    return this.testRepository.getAll()
  }

  public async getTest(code: string) {
    return this.testRepository.getOne({ conditions: { codeTest: code } })
  }

  public async calculationAnswer(dto: AnswerTestDto) {
    const answer = dto.answer
    let score = 0
    for (const item of answer) {
      const answer = await this.questionService.checkAnswer(
        item.id,
        item.answer,
      )
      score += answer
    }
    return score
  }
}
