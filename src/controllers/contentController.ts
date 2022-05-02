import { Request, Response } from "express";
import { insertTeachersDisciplines } from "../repositories/contentRepositories.js";
import { addViewService, getAllTeachersService, getAllTeachersTestsService, getDisciplinesService, getFormDataService, getSearchedDisciplinesService, getTermsService, getTestsService, insertTestIntoDatabase } from "../services/contentServices.js";

export async function getTerms(req: Request, res: Response) {

    const Terms = await getTermsService();
 
     res.send(Terms);
 }

export async function getDisciplines(req: Request, res: Response) {

   const disciplines = await getDisciplinesService();

    res.send(disciplines);
}

export async function getTests(req: Request, res: Response) {

    const tests = await getTestsService();
 
     res.send(tests);
 }

 export async function getFormData(req: Request, res: Response) {

    const formData = await getFormDataService();
    
    res.send(formData);
 }

 export async function addTest(req: Request, res: Response) {

    interface testData {
        testName: string,
        testLink: string,
        categoryId: number,
        discipline: string,
        teacher: string,
        disciplineId: number,
        teacherId: number
    }

    const testData: testData = req.body;

    await insertTestIntoDatabase(testData);
    
    res.sendStatus(201);
 }

 export async function getTeachers(req: Request, res: Response) {

    const searchValue = req.params;

    const teachers = await getAllTeachersService(searchValue);
 
     res.send(teachers);
 }

 export async function addView(req: Request, res: Response) {

    const link: string = req.body.link;

    await addViewService(link);
 
 }

 export async function getTeachersTets(req: Request, res: Response) {

    const tests = await getAllTeachersTestsService();
 
     res.send(tests);
 }

 export async function getSearchedDisciplines(req: Request, res: Response) {

    const searchValue: string = req.params.searchValue;

    const disciplines = await getSearchedDisciplinesService(searchValue);
 
     res.send(disciplines);
 }

