import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1732725725081 implements MigrationInterface {
    name = 'InitDatabase1732725725081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`phq9_answer_questions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`deleted_at\` timestamp(6) NULL, \`created_by\` int NULL, \`updated_by\` int NULL, \`answer_option\` enum ('A', 'B', 'C', 'D') NOT NULL, \`answer_text\` text NOT NULL, \`score\` tinyint NOT NULL, \`question_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`phq9_questions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`deleted_at\` timestamp(6) NULL, \`created_by\` int NULL, \`updated_by\` int NULL, \`question_text\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`surveys\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`deleted_at\` timestamp(6) NULL, \`created_by\` int NULL, \`updated_by\` int NULL, \`total_score\` tinyint NOT NULL, \`depression_level\` enum ('no_depression', 'mild_depression', 'moderate_depression', 'severe_depression', 'very_severe_depression') NOT NULL DEFAULT 'no_depression', \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`phq9_responses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`deleted_at\` timestamp(6) NULL, \`created_by\` int NULL, \`updated_by\` int NULL, \`answer_value\` tinyint NOT NULL, \`user_id\` int NULL, \`survey_id\` int NULL, \`question_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`deleted_at\` timestamp(6) NULL, \`created_by\` int NULL, \`updated_by\` int NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(100) NOT NULL, \`phone_number\` varchar(15) NOT NULL, \`birthday\` date NOT NULL, \`hobby\` text NULL, \`gender\` enum ('male', 'female', 'other') NOT NULL DEFAULT 'other', \`avatar\` text NULL, \`role\` enum ('student', 'admin') NOT NULL DEFAULT 'student', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`suggestions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`deleted_at\` timestamp(6) NULL, \`created_by\` int NULL, \`updated_by\` int NULL, \`depression_level\` enum ('no_depression', 'mild_depression', 'moderate_depression', 'severe_depression', 'very_severe_depression') NOT NULL DEFAULT 'no_depression', \`suggestion\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`phq9_answer_questions\` ADD CONSTRAINT \`FK_e73c70bccde15017d7f6af0a53a\` FOREIGN KEY (\`question_id\`) REFERENCES \`phq9_questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`surveys\` ADD CONSTRAINT \`FK_3e312e00b31402a7e6093db119a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`phq9_responses\` ADD CONSTRAINT \`FK_8133140c0f79c50df19bf2f7372\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`phq9_responses\` ADD CONSTRAINT \`FK_68e23b2bdfc25e873f84805a3d8\` FOREIGN KEY (\`survey_id\`) REFERENCES \`surveys\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`phq9_responses\` ADD CONSTRAINT \`FK_9c438c1f7ce7b117211da6ea295\` FOREIGN KEY (\`question_id\`) REFERENCES \`phq9_questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`phq9_responses\` DROP FOREIGN KEY \`FK_9c438c1f7ce7b117211da6ea295\``);
        await queryRunner.query(`ALTER TABLE \`phq9_responses\` DROP FOREIGN KEY \`FK_68e23b2bdfc25e873f84805a3d8\``);
        await queryRunner.query(`ALTER TABLE \`phq9_responses\` DROP FOREIGN KEY \`FK_8133140c0f79c50df19bf2f7372\``);
        await queryRunner.query(`ALTER TABLE \`surveys\` DROP FOREIGN KEY \`FK_3e312e00b31402a7e6093db119a\``);
        await queryRunner.query(`ALTER TABLE \`phq9_answer_questions\` DROP FOREIGN KEY \`FK_e73c70bccde15017d7f6af0a53a\``);
        await queryRunner.query(`DROP TABLE \`suggestions\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`phq9_responses\``);
        await queryRunner.query(`DROP TABLE \`surveys\``);
        await queryRunner.query(`DROP TABLE \`phq9_questions\``);
        await queryRunner.query(`DROP TABLE \`phq9_answer_questions\``);
    }

}
