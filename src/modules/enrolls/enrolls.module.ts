import { Module } from '@nestjs/common';
import { EnrollsService } from './enrolls.service';
import { EnrollsController } from './enrolls.controller';

@Module({
  controllers: [EnrollsController],
  providers: [EnrollsService],
})
export class EnrollsModule {}
