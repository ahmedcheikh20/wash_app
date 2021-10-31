import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from '../user.entity';
import {Repository} from 'typeorm';
import { Users } from '../user.interface';
import { from,Observable } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(userEntity)
        private userRepository: Repository<userEntity>
    ){}


    add(user:Users): Observable<Users> {
        return from(this.userRepository.save(user))
    }
 
    findAll(): Observable<Users[]> {
        return from(this.userRepository.find())
    }
}
