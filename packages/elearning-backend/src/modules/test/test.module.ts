import { Module } from '@nestjs/common'
import { TestService } from './test.service'
import { TestController } from './test.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { TEST_DB, TestSchema } from './entity/test.entity'
import { TestRepository } from './repository/test.repository'
import { QuestionModule } from '../question/question.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TEST_DB, schema: TestSchema }]),
    QuestionModule,
  ],
  providers: [TestService, TestRepository],
  controllers: [TestController],
})
export class TestModule {}
