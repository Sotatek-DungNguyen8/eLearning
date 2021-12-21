import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { QuestionRepository } from './repository/question.repository'
import { Question, QuestionDocument } from './entity/question.entity'
import { CreateQuestion } from './dto/create-question.dto'

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  public async create(dto: CreateQuestion) {
    const data: Question = {
      ...dto,
    }
    return this.questionRepository.create(data)
  }
  public async createMany(dto: CreateQuestion[]): Promise<QuestionDocument[]> {
    return this.questionRepository.createMany(dto)
  }
  public async getAll(): Promise<QuestionDocument[]> {
    console.log(await this.questionRepository.getAll())
    return this.questionRepository.getAll()
  }
  public async updateQuestion(
    id: string,
    dto: CreateQuestion,
  ): Promise<QuestionDocument> {
    const question = await this.questionRepository.getById({ id })
    if (!question) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Can't find Question`,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
    return this.questionRepository.updateOne({
      conditions: {
        _id: id,
      },
      update: {
        dto,
      },
      options: {
        new: true,
      },
    })
  }
  public async deleteQuestion(id: string): Promise<QuestionDocument> {
    const question = await this.questionRepository.getById({ id })
    if (!question) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Can't find Question`,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
    return this.questionRepository.deleteById(id)
  }
}
