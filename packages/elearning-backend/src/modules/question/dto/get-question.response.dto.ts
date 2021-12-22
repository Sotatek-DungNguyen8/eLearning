import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator'
import { QuestionType } from '../question.enum'
import { Answer } from '../entity/question.entity'

export class GetQuestionResponseDto {
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
}
