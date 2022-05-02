import { client } from "../../database.js"

export async function getTermsRepository() {

    const Terms = await client.terms.findMany();

    return Terms;

}

export async function getDisciplinesRepository() {

    const disciplines = await client.$queryRaw`SELECT terms.number AS periodo, disciplines.name AS materia
    FROM terms 
    LEFT JOIN disciplines ON terms.id = disciplines."termId" 
    WHERE disciplines.name IS NOT NULL
    ORDER BY terms.number;`

    return disciplines

}

export async function getTestsRepository() {

    const tests = await client.$queryRaw`SELECT terms.number AS periodo, disciplines.name AS materia, tests.name AS prova, teachers.name AS professor, tests."pdfUrl" AS "testLink", tests.views AS views
    FROM terms 
    LEFT JOIN disciplines ON terms.id = disciplines."termId" 
    LEFT JOIN "teachersDisciplines" ON "teachersDisciplines"."disciplineId" = disciplines.id
    LEFT JOIN teachers ON "teachersDisciplines"."teacherId" = teachers.id
    LEFT JOIN tests ON "teachersDisciplines".id = tests."teachersDisciplineId" 
    WHERE tests.name IS NOT NULL
    ORDER BY terms.number;`

    return tests;

}

export async function getCategoriesRepository() {

    const categories = await client.categories.findMany();

    return categories;

}

export async function getAllDisciplinesRepository() {

    const disciplines = await client.disciplines.findMany();

    return disciplines;

}

export async function getTeachersRepository() {

    const teachers = await client.$queryRaw`SELECT disciplines.name AS discipline, teachers.name AS teacher, teachers.id AS "id"
    FROM teachers
    LEFT JOIN "teachersDisciplines" ON teachers.id = "teachersDisciplines"."teacherId"
    LEFT JOIN disciplines ON "teachersDisciplines"."disciplineId" = disciplines.id
    ORDER BY disciplines.name;`

    return teachers;

}

export async function insertTeachersDisciplines(teacherId: number, disciplineId: number) {

    await client.teachersDisciplines.create({
        data: {
            teacherId: teacherId,
            disciplineId: disciplineId
        }
    })

}

export async function findTeachersDiscipline(teacherId: number, disciplineId: number) {

    const teachersDiscipline = await client.teachersDisciplines.findFirst({
        where: {
            teacherId: teacherId,
            disciplineId: disciplineId
        }
    })

    return teachersDiscipline;

}

export async function insertTest(testName: string, testLink: string, categoryId: number, teachersDisciplineId: number) {


    await client.tests.create({
        data: {
            name: testName,
            pdfUrl: testLink,
            categoryId: categoryId,
            teachersDisciplineId: teachersDisciplineId
        }
    })

}

export async function getAllTeachersRepository(searchValue) {

    let teachers = null;

    if(searchValue.searchValue === undefined) {
           teachers = await client.$queryRaw`
            SELECT * FROM teachers;
        `
    } else if (searchValue.searchValue) {
        teachers = await client.teachers.findMany({
            where: {
                name: {
                    contains: searchValue.searchValue,
                    mode: 'insensitive'
                }
            }
        })
    }

    return teachers;

}

export async function addViewRepository(link: string) {

    await client.tests.update({
        data:{
            views: {increment: 1}
        },
        where: {
            pdfUrl: link
        }
    });
}

export async function getAllTeachersTestsRepository() {

    const tests = await client.$queryRaw`
    SELECT categories.name AS category, 
    tests.name  AS test, 
    disciplines.name AS discipline, 
    teachers.name AS teacher,
    tests."pdfUrl" AS "testLink",
    tests.views AS "views"
    FROM categories
    LEFT JOIN tests ON tests."categoryId" = categories.id
    LEFT JOIN "teachersDisciplines" ON "teachersDisciplines".id = tests."teachersDisciplineId"
    LEFT JOIN disciplines ON "teachersDisciplines"."disciplineId" = disciplines.id
    LEFT JOIN teachers ON "teachersDisciplines"."teacherId" = teachers.id
    ORDER BY teachers.name, categories.name;
    `

    return tests;
}

export async function getSearchedDisciplinesRepository(searchValue: string) {

    const disciplines = await client.$queryRawUnsafe(`SELECT terms.number AS periodo, disciplines.name AS materia
    FROM terms 
    LEFT JOIN disciplines ON terms.id = disciplines."termId" 
    WHERE disciplines.name IS NOT NULL
	AND disciplines.name ILIKE $1
    ORDER BY terms.number;`, `${searchValue}%`)

    return disciplines

}