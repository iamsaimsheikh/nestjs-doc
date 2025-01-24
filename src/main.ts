import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { MyLogger } from 'middleware/logger.middleware'

async function bootstrap() {
  const logger = new MyLogger()
  logger.autoClearConsole()
  const app: INestApplication = await NestFactory.create(AppModule, {
    logger: logger,
  })

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('NestJs Documentation Implementation')
    .setDescription(
      'This swagger docs covers the implementation of nestjs implementation for learning through nestjs docs.',
    )
    .setVersion('1.0')
    .addTag('NestJs')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  await app.listen(process.env.PORT ?? 3005)
}
bootstrap()
