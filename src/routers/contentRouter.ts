import { Router } from "express";
import * as contentControllers from "../controllers/contentController.js"

const contentRouter = Router();

contentRouter.get("/getTerms/", contentControllers.getTerms);
contentRouter.get("/getDisciplines", contentControllers.getDisciplines);
contentRouter.get("/getTests", contentControllers.getTests);
contentRouter.get("/getFormData", contentControllers.getFormData);
contentRouter.post("/addTest", contentControllers.addTest);
contentRouter.get("/getTeachers/", contentControllers.getTeachers);
contentRouter.get("/getTeachers/:searchValue", contentControllers.getTeachers);
contentRouter.post("/addView", contentControllers.addView);
contentRouter.get("/getTeachersTests", contentControllers.getTeachersTets);
contentRouter.get("/getDisciplines/:searchValue", contentControllers.getSearchedDisciplines);

export default contentRouter;