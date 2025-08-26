import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import PrismaModule from './prisma/prisma.module';
import { CheckPermissionStrategy } from './common/permission/permission-strategy';
import { AvailableTimeModule } from './modules/available-time/available-time.module';
import { TagsModule } from './modules/tags/tags.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { EnrollsModule } from './modules/enrolls/enrolls.module';
import { CertificationsModule } from './modules/certifications/certifications.module';
import { TopicModule } from './modules/topics/topic.module';
import { CourseModule } from './modules/courses/course.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    CourseModule,
    AvailableTimeModule,
    TopicModule,
    TagsModule,
    ReviewsModule,
    LessonsModule,
    EnrollsModule,
    CertificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CheckPermissionStrategy],
})
export class AppModule {}
