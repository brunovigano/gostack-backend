import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1619061895880 implements MigrationInterface {
  private ovo: boolean;

  constructor(ovo: boolean) {
    this.ovo = ovo;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.ovo = true;

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.ovo = true;

    await queryRunner.dropTable('users');
  }
}