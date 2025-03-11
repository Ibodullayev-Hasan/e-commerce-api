import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupGlobalPipes } from './configs';
import { NotFoundExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)

  app.setGlobalPrefix('api/v1')

  setupGlobalPipes(app)

  app.useGlobalFilters(new NotFoundExceptionFilter())

  const port = configService.get<number>('SERVER_PORT')
  await app.listen(port, () => {
    console.log(`Server run on port: ${port}`)
  });
}
bootstrap();
