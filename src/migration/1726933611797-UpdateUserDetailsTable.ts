import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserDetailsTable1726933611797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE user_details
      DROP INDEX email,
      ADD COLUMN userId INT,
      ADD CONSTRAINT FK_user FOREIGN KEY (userId) REFERENCES user(id)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE user_details
      DROP FOREIGN KEY FK_user,
      DROP COLUMN userId,
      ADD UNIQUE (email)
    `);
  }
}
