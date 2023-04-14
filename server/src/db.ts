import { DataSource } from "typeorm";
import { Post } from './entities/Post';

export const AppDataSource = new DataSource({
    type:'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'fy0ra_12',
    database:'pruebaTCIT',
    port: 5432,
    entities: [Post],
    synchronize: true
})