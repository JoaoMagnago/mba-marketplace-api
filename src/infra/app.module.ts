import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
// import { AuthModule } from './auth/auth.module'
// import { EnvModule } from './env/env.module'
// import { EventsModule } from './events/events.module'

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   validate: (env) => envSchema.parse(env),
    //   isGlobal: true,
    // }),
    HttpModule,
  ],
})
export class AppModule { }