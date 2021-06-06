import { MigrationInterface, QueryRunner } from 'typeorm';

import BCryptHashProvider from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';

export class CreateUserRoot1620690452659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const bcryptHashProvider = new BCryptHashProvider();
    const password = await bcryptHashProvider.generateHash('root123!');

    await queryRunner.query(
      `INSERT INTO users (name, email, password) VALUES ('root', 'root@root.com', '${password}')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM users WHERE name = 'root'");
  }
}
