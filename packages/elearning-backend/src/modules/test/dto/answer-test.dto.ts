import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator'
import { AnswerType } from '../../question/question.enum'

export class AnswerTestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  testCode: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  numberQuestion: number

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  answer: Answer[]
}
export class Answer {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsString()
  answer: AnswerType
}
