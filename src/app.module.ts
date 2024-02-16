import { Module } from '@nestjs/common';
import { AuthModule } from './cats/cats.module';

@Module({
  imports: [AuthModule],
})
export class AppModule {}
