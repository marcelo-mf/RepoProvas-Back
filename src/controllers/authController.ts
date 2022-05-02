import { Request, Response } from "express";
import * as authServices from "../services/authServices.js"
import bcrypt from "bcrypt";
import { client } from "../../database.js";

export async function SignUp(req: Request, res: Response) {

    interface User {
        email: string,
        password: string
    }

    const {email, password}: User = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    await authServices.checkIfUserAlreadyExists(email);
    await authServices.insertUserIntoDatabase(email, hashedPassword);

    res.send('ok');
}

export async function SignIn(req: Request, res: Response) {

    interface User {
        email: string,
        password: string
    }

    const {email, password}: User = req.body;

    const token = await authServices.generateToken(email);
    await authServices.validateUserAndPassword(email, password, token);

    const teste = await client.$queryRaw`SELECT terms.number AS periodo, disciplines.name AS matéria, tests.name AS prova, teachers.name AS professor
    FROM terms 
    LEFT JOIN disciplines ON terms.id = disciplines."termId" 
    LEFT JOIN "teachersDisciplines" ON "teachersDisciplines"."disciplineId" = disciplines.id
    LEFT JOIN teachers ON "teachersDisciplines"."teacherId" = teachers.id
    LEFT JOIN tests ON "teachersDisciplines".id = tests."teachersDisciplineId" 
    ORDER BY terms.number;`

    res.send({message: 'logado', token: token})
}