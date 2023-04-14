import "reflect-metadata";
import app from './app';
import { AppDataSource } from "./db";

async function main() {
    try{
        await AppDataSource.initialize();
        console.log('Database connected');
        app.listen(3001);
        console.log('Sever is listening on port', 3001);
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        reportError({message})
    }
};

main();


