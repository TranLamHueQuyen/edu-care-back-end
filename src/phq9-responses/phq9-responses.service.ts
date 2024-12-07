import { BadRequestException, Injectable } from '@nestjs/common'
import { CreatePhq9ResponseDto } from './dto/create-phq9-response.dto'
import { UpdatePhq9ResponseDto } from './dto/update-phq9-response.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { PHQ9Responses } from '@/phq9-responses/entities/phq9-response.entity'
import { Surveys } from '@/surveys/entities/survey.entity'
import { EntityManager, Repository } from 'typeorm'
import { PHQ9Questions } from '@/phq9-questions/entities/phq9-question.entity'
import { UsersService } from '@/users/users.service'
import { SurveysService } from '@/surveys/surveys.service'
import { DepressionLevel } from '@/surveys/enum/surveys.enum'
@Injectable()
export class Phq9ResponsesService {
  constructor(
    @InjectRepository(PHQ9Responses)
    private readonly phq9ResponsesRepository: Repository<PHQ9Responses>,

    @InjectRepository(PHQ9Questions)
    private readonly phq9QuestionsRepository: Repository<PHQ9Questions>,

    private readonly usersService: UsersService,
    private readonly surveysService: SurveysService,
  ) {}

  // async saveMultipleAnswers(createPHQ9ResponsesDto: CreatePhq9ResponseDto): Promise<void> {
  //   const { userId, surveyId, answers } = createPHQ9ResponsesDto
  //   const user = await this.usersService.findOne(userId)
  //   const survey = await this.surveysService.findOne(surveyId)

  //   // Kiểm tra xem các câu hỏi có hợp lệ không
  //   const questionIds = answers.map((answer) => answer.questionId)
  //   const questions = await this.phq9QuestionsRepository.findByIds(questionIds)
  //   if (questions.length !== answers.length) {
  //     throw new BadRequestException('Some questions are invalid')
  //   }
   
  //   await this.phq9ResponsesRepository.manager.transaction(async (manager: EntityManager) => {
  //     await Promise.all(
  //       answers.map(async (answer) => {
  //         const question = questions.find((q) => q.id === answer.questionId)
  //         if (!question) {
  //           throw new Error(`Question with ID ${answer.questionId} not found`)
  //         }
  //         const response = new PHQ9Responses()
  //         response.user = user
  //         response.survey = survey
  //         response.question = question
  //         response.answerValue = answer.answerValue

  //         // Lưu câu trả lời vào DB trong transaction
  //         await manager.save(PHQ9Responses, response)
  //       })
  //     )
  //   })
  // }
  async saveSurveyAndAnswers(createPHQ9ResponsesDto: CreatePhq9ResponseDto): Promise<void> {
    const { userId, answers } = createPHQ9ResponsesDto;
  
    // Lấy thông tin người dùng
    const user = await this.usersService.findOne(userId);
  
    // Kiểm tra xem các câu hỏi có hợp lệ không
    const questionIds = answers.map((answer) => answer.questionId);
    const questions = await this.phq9QuestionsRepository.findByIds(questionIds);
    if (questions.length !== answers.length) {
      throw new BadRequestException('Some questions are invalid');
    }
  
    // Sử dụng transaction để lưu Survey và PHQ9Responses
    await this.phq9ResponsesRepository.manager.transaction(async (manager: EntityManager) => {
      // Tạo bản ghi mới trong bảng Surveys
      const survey = new Surveys();
      survey.user = user;
      survey.createdAt = new Date();
      survey.createdBy = userId; // giả sử createdBy được lưu là userId
      survey.totalScore = 0; // Sẽ được cập nhật sau
  
      // Lưu Survey trong transaction
      await manager.save(Surveys, survey);
  
      let totalScore = 0;
  
      // Lưu câu trả lời vào bảng PHQ9Responses
      await Promise.all(
        answers.map(async (answer) => {
          const question = questions.find((q) => q.id === answer.questionId);
          if (!question) {
            throw new Error(`Question with ID ${answer.questionId} not found`);
          }
          const response = new PHQ9Responses();
          response.user = user;
          response.survey = survey; // Gán survey vào response
          response.question = question;
          response.answerValue = answer.answerValue;
  
          // Cộng dồn tổng điểm
          totalScore += answer.answerValue;
  
          // Lưu câu trả lời
          await manager.save(PHQ9Responses, response);
        })
      );
  
      // Cập nhật tổng điểm và mức độ trầm cảm trong bảng Surveys
      survey.totalScore = totalScore;
      survey.depressionLevel = this.calculateDepressionLevel(totalScore);
  
      // Cập nhật lại Survey với thông tin đã tính toán
      await manager.save(Surveys, survey);
    });
  }
  
  // Hàm tính mức độ trầm cảm dựa trên tổng điểm
  private calculateDepressionLevel(totalScore: number): DepressionLevel {
    if (totalScore >= 0 && totalScore <= 4) {
      return DepressionLevel.NoDepression;
    } else if (totalScore >= 5 && totalScore <= 9) {
      return DepressionLevel.MildDepression;
    } else if (totalScore >= 10 && totalScore <= 14) {
      return DepressionLevel.ModerateDepression;
    } else if (totalScore >= 15 && totalScore <= 19) {
      return DepressionLevel.SevereDepression;
    } else {
      return DepressionLevel.VerySevereDepression;
    }
  }

  create(createPhq9ResponseDto: CreatePhq9ResponseDto) {
    return 'This action adds a new phq9Response'
  }

  findAll() {
    return `This action returns all phq9Responses`
  }

  findOne(id: number) {
    return `This action returns a #${id} phq9Response`
  }

  update(id: number, updatePhq9ResponseDto: UpdatePhq9ResponseDto) {
    return `This action updates a #${id} phq9Response`
  }

  remove(id: number) {
    return `This action removes a #${id} phq9Response`
  }
}
