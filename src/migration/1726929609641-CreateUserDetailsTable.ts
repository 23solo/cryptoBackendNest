import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserDetailsTable1726929609641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE userDetails (
        id INT AUTO_INCREMENT NOT NULL,
        phoneNumber VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        userId INT,
        PRIMARY KEY (id),
        UNIQUE (email),
        CONSTRAINT FK_user FOREIGN KEY (userId) REFERENCES user(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE userDetails`);
  }
}
