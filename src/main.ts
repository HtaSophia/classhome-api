import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: {
            origin: true,
            exposedHeaders: ['Content-Disposition'],
        },
    });
    app.setGlobalPrefix('api');

    await app.listen(3000);
}
void bootstrap();
