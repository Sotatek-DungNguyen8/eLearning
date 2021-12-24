import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { TestRepository } from './repository/test.repository'
import { CreateTestDto } from './dto/create-test.dto'
import { TestDocument } from './entity/test.entity'
import { QuestionService } from '../question/question.service'
import { AnswerTestDto } from './dto/answer-test.dto'
import { UsersService } from '../users/users.service'
import { SetTestRepository } from './repository/setTest.repository'

@Injectable()
export class TestService {
  constructor(
    private readonly testRepository: TestRepository,
    private readonly setTestRepository: SetTestRepository,
    private readonly questionService: QuestionService,
    private readonly usersService: UsersService,
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
    return this.testRepository.getOne({ conditions: { testCode: code } })
  }

  public async getTestRandom() {
    return this.testRepository.getOne({})
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
  public async calculationAnswerUser(email: string, dto: AnswerTestDto) {
    const user = await this.usersService.getByEmail(email)
    const userID = user.id
    const answer = dto.answer
    let score = 0
    for (const item of answer) {
      const answer = await this.questionService.checkAnswer(
        item.id,
        item.answer,
      )
      score += answer
    }
    return this.setTestRepository.create({
      idUser: userID,
      score: score,
    })
  }
}
