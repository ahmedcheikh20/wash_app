import { Controller, Post, Body, Get, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { WorkersService } from '../services/workers.service';
import { Worker } from '../workers.interface'
import { Observable } from 'rxjs';
import { Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
@Controller('workers')
export class WorkersController {
    constructor(
        private workerService: WorkersService
    ) { }


    @Post("login")
    isAuth(@Body() user: object, @Res() respone: Response) {

        this.workerService.findUserWithUserName(user).subscribe(result => {
         
            if (result == undefined) {
                respone.status(HttpStatus.NOT_FOUND)
                    .json({ response: "check your user name or your  password" })
                return;
            } else {
                bcrypt.compare(user['password'], result.password).then((result_: boolean) => {
                    if (result_) {
                        const token: string = jwt.sign({ workerid: result.id }, process.env.TOKEN_KEY)

                        respone.status(HttpStatus.CREATED)
                            .json({ Token: token })
                        return;

                    } else {

                        respone.status(HttpStatus.NOT_FOUND)
                            .json({ response: "check your user name or your  password" })
                        return;
                    }
                })
            }
        })


    }
    @Post()
    async add(@Body() worker: Worker) {
        try {
            const {
                name,
                email,
                phone,
                positionx,
                positiony,
                password
            } = worker
            console.log(password)
            const hashedPass = await bcrypt.hash(password, 10)
            this.workerService.add({
                id: 0,
                name,
                email,
                phone,
                positionx,
                positiony,
                password: hashedPass,
                isAvailable: false,
                requests: []
            })


        } catch (err) {
            console.log(err)
        }
    }


    @Get()

    findAll(): Observable<Worker[]> {

        return this.workerService.findAll()
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() worker: Worker
    ): Observable<UpdateResult> {

        return this.workerService.updateWorker(id, worker)
    }

    @Delete(":id")
    deleteWorker(
        @Param('id') id: number,
    ): Observable<DeleteResult> {
        return this.workerService.deleteWorker(id)
    }

}
