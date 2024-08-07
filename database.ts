import { DataSource } from 'typeorm';
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

@Entity()
class ExampleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [ExampleEntity],
  subscribers: [],
  migrations: [],
});

const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
}

const getRepository = (entity: any) => {
  if (!AppDataSource.isInitialized) throw new Error("Database connection is not initialized.");
  return AppDataSource.getRepository(entity);
}

export { initializeDatabase, getRepository };