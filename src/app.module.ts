import { Module } from '@nestjs/common';
import { AuthModule } from './auth/cats.module';
import { PlansModule } from './plans/plans.module';


@Module({
  imports: [AuthModule,PlansModule],
  providers: [],
})
export class AppModule {}
