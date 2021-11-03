import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WorkersModule } from './workers/workers.module';
import PhoneController from './auth/phone/phone.controller';
import { PhoneModule } from './auth/phone/phone.module';
import { PhoneService } from './auth/phone/phone.service';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      username:"postgres",
      password: "Hovcu",
      // extra: {
      //   ssl: true
      // }
    }),
    UsersModule,
    WorkersModule,
    PhoneModule
  ],
  controllers: [AppController, PhoneController],
  providers: [AppService, PhoneService],
})
export class AppModule {}
