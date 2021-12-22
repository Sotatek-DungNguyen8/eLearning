import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator'
import { QuestionType } from '../test.enum'

export class CreateTestDto {
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
  questionCode: [string]

  @ApiProperty({ type: 'enum', enum: QuestionType })
  @IsEnum(QuestionType)
  @IsNotEmpty()
  type: QuestionType
}
