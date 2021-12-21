import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsDefined, IsNotEmpty, IsObject, IsString, Min } from 'class-validator'
import { Document } from 'mongoose'
import { QuestionType } from '../question.enum'
import { ApiProperty } from '@nestjs/swagger'

export const QUESTION_DB = 'question'

@Schema({
  collection: QUESTION_DB,
  timestamps: true,
  toJSON: { virtuals: true },
  collation: { locale: 'vi' },
  validateBeforeSave: true,
})
export class Answer {
  @ApiProperty()
  @IsString()
  answerA: string

  @ApiProperty()
  @IsString()
  answerB: string

  @ApiProperty()
  @IsString()
  answerC: string

  @ApiProperty()
  @IsString()
  answerD: string
}
export class Question {
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  question: string

  @Prop({
    required: true,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  questionType: QuestionType

  @Prop({
    required: true,
  })
  @IsObject()
  @IsNotEmpty()
  @Min(0)
  answer: Answer

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Min(0)
  correctAnswer: string
}

export const QuestionSchema = SchemaFactory.createForClass(Question)

export interface QuestionDocument extends Question, Document {}
