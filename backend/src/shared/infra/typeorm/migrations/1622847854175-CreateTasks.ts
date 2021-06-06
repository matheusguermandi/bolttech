import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTasks1622847854175 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'date_start',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'date_end',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            default: "'TODO'",
          },
          {
            name: 'project_id',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],

        foreignKeys: [
          {
            name: 'TasksProject',
            columnNames: ['project_id'],
            referencedTableName: 'projects',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
