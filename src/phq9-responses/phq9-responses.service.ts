import { Injectable } from '@nestjs/common';
import { CreatePhq9ResponseDto } from './dto/create-phq9-response.dto';
import { UpdatePhq9ResponseDto } from './dto/update-phq9-response.dto';

@Injectable()
export class Phq9ResponsesService {
  create(createPhq9ResponseDto: CreatePhq9ResponseDto) {
    return 'This action adds a new phq9Response';
  }

  findAll() {
    return `This action returns all phq9Responses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phq9Response`;
  }

  update(id: number, updatePhq9ResponseDto: UpdatePhq9ResponseDto) {
    return `This action updates a #${id} phq9Response`;
  }

  remove(id: number) {
    return `This action removes a #${id} phq9Response`;
  }
}
