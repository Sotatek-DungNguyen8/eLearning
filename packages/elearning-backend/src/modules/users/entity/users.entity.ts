import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsDefined, IsNotEmpty, IsString, Min } from 'class-validator'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import Role from '../role.enum'

export const USERS_DB = 'users'

@Schema({
  collection: USERS_DB,
  timestamps: true,
  toJSON: { virtuals: true },
  collation: { locale: 'vi' },
  validateBeforeSave: true,
})
export class Users {
  @Prop({
    type: mongoose.Schema.Types.String,
    enum: Object.values(Role),
    default: Role.User,
  })
  role: Role

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string

  @Prop({
    required: true,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Min(0)
  password: string
}

export const UsersSchema = SchemaFactory.createForClass(Users)

export interface UsersDocument extends Users, Document {}
