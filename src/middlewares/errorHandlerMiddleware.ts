import {NextFunction, Request, Response } from "express";

export function errorHandlerMiddleware(error, req: Request, res: Response, next: NextFunction) {

    if(error.message){
        res.send(error.message);
    } else if (error.message === 'falha no login') {
        res.sendStatus(404);
    } else {
        res.sendStatus(500);
    }   
}