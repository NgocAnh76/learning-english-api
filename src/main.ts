import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TokenCheck } from './modules/auth/token/token-check';
import { PermissionCheck } from './common/permission/permission.check';
import { ResponseSuccessInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new TokenCheck(reflector));
  app.useGlobalGuards(new PermissionCheck(reflector));
  app.useGlobalInterceptors(new ResponseSuccessInterceptor(reflector));

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://google.com',
      'http://localhost:3069',
    ],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Learning API')
    .setDescription('Learning API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Server is running on port http://localhost:${process.env.PORT ?? 3000}/docs`,
  );
}
void bootstrap();
