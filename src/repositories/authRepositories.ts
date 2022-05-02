import { client } from "../../database.js";

export async function findUserByEmail(email: string) {

    const userExists = await client.users.findFirst({
        where: {
            email: email
        }
    })

    return userExists
}

export async function insertUser(email: string, password: string) {

    await client.users.create({
        data: {
            email: email, 
            password: password
        }
    });
}

export async function insertSession(token: string, userId: number ) {

    await client.sessions.create({
        data: {
            token: token, 
            userId: userId
        }
    });
}
