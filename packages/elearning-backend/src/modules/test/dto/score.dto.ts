import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Answer } from './answer-test.dto'

export class ScoreDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  score: number
}