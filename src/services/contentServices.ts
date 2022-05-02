import { addViewRepository, findTeachersDiscipline, getAllDisciplinesRepository, getAllTeachersRepository, getAllTeachersTestsRepository, getCategoriesRepository, getDisciplinesRepository, getSearchedDisciplinesRepository, getTeachersRepository, getTermsRepository, getTestsRepository, insertTeachersDisciplines, insertTest } from "../repositories/contentRepositories.js";

export async function getTermsService() {

    const Terms = await getTermsRepository();
 
    return Terms;
 
 }

export async function getDisciplinesService() {

   const disciplines = await getDisciplinesRepository();

   return disciplines;

}

export async function getTestsService() {

    const tests = await getTestsRepository();
 
    return tests;
 
 }

 export async function getFormDataService() {

   const categories = await getCategoriesRepository();
   const disciplines = await getAllDisciplinesRepository();
   const teachers = await getTeachersRepository();

   return {categories: categories, disciplines: disciplines, teachers: teachers}

}


export async function insertTestIntoDatabase({teacherId, disciplineId, testName, testLink, categoryId}) {

   const teachersDiscipline = await findTeachersDiscipline(teacherId, disciplineId);
   await insertTest(testName, testLink, parseInt(categoryId), teachersDiscipline.id);


}

export async function getAllTeachersService(searchValue) {

   const teachers = await getAllTeachersRepository(searchValue);

   return teachers;

}

export async function addViewService(link: string) {

   await addViewRepository(link);

}

export async function getAllTeachersTestsService() {

   const tests = await getAllTeachersTestsRepository();

   return tests;

}

export async function getSearchedDisciplinesService(searchValue: string) {

   const disciplines = await getSearchedDisciplinesRepository(searchValue)

   return disciplines;

}

