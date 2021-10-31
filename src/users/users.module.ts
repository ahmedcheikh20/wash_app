import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UsersController } from './users-controller/users-controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([userEntity])],
  providers: [UsersService],
  controllers: [UsersController, UsersController]
})
export class UsersModule {}
