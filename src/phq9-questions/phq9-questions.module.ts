import { Module } from '@nestjs/common';
import { Phq9QuestionsService } from './phq9-questions.service';
import { Phq9QuestionsController } from './phq9-questions.controller';

@Module({
  controllers: [Phq9QuestionsController],
  providers: [Phq9QuestionsService],
})
export class Phq9QuestionsModule {}
