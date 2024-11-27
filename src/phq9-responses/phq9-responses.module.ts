import { Module } from '@nestjs/common';
import { Phq9ResponsesService } from './phq9-responses.service';
import { Phq9ResponsesController } from './phq9-responses.controller';

@Module({
  controllers: [Phq9ResponsesController],
  providers: [Phq9ResponsesService],
})
export class Phq9ResponsesModule {}
