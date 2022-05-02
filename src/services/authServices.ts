import * as authRepositories from "../repositories/authRepositories.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function checkIfUserAlreadyExists(email: string) {
    
    const userExists = await authRepositories.findUserByEmail(email);

    if (userExists) {
        throw {message: 'User already exists'}
    }
}

export async function insertUserIntoDatabase(email: string, password: string) {

    await authRepositories.insertUser(email, password);
}

export async function validateUserAndPassword(email: string, password: string, token: string) {
 
    const user = await authRepositories.findUserByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
        authRepositories.insertSession(token, user.id)

    } else {
        throw {message: "falha no login"}
    }
}

export async function generateToken(email: string) {

    const dados = {email: email}
    const chaveSecreta = process.env.JWT_SECRET;
    const token: string = jwt.sign(dados, chaveSecreta);

    return token;
}