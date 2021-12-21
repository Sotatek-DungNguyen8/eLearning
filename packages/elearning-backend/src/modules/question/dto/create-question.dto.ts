import { ApiProperty } from '@nestjs/swagger'
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  Min,
} from 'class-validator'
import { AnswerType, QuestionType } from '../question.enum'
import { Answer } from '../entity/question.entity'

export class CreateQuestion {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  question: string

  @ApiProperty({
    type: 'enum',
    enum: QuestionType,
    description: 'Select what type of Model: Prepaid/Postpaid',
  })
  @IsEnum(QuestionType)
  @IsNotEmpty()
  questionType: QuestionType

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  answer: Answer

  @ApiProperty({
    type: 'enum',
    enum: AnswerType,
    description: 'Select what type of Model: Prepaid/Postpaid',
  })
  @IsEnum(AnswerType)
  @IsNotEmpty()
  correctAnswer: AnswerType
}
