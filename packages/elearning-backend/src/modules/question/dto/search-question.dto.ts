import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsObject, IsString, Min } from 'class-validator'
import { QuestionType } from '../question.enum'

export class QuestionSearchDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  questionSearch: string
}
