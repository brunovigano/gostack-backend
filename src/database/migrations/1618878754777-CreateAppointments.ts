import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1618878754777 implements MigrationInterface {
  private ovo: boolean;

  constructor(ovo: boolean) {
    this.ovo = ovo;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.ovo = true;

    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.ovo = true;

    await queryRunner.dropTable('appointments');
  }
}
