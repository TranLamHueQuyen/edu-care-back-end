import { Injectable } from '@nestjs/common';
import { CreatePhq9QuestionDto } from './dto/create-phq9-question.dto';
import { UpdatePhq9QuestionDto } from './dto/update-phq9-question.dto';

@Injectable()
export class Phq9QuestionsService {
  create(createPhq9QuestionDto: CreatePhq9QuestionDto) {
    return 'This action adds a new phq9Question';
  }

  findAll() {
    return `This action returns all phq9Questions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phq9Question`;
  }

  update(id: number, updatePhq9QuestionDto: UpdatePhq9QuestionDto) {
    return `This action updates a #${id} phq9Question`;
  }

  remove(id: number) {
    return `This action removes a #${id} phq9Question`;
  }
}
