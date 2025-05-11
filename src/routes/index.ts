import { Application } from "express";
import grades from "./grade.routes";
import enrollments from "./enrollment.routes";
import people from "./person.routes";
import courses from "./course.routes";
export const registerRoutes = (app: Application) => {
    app.use('/grades', grades)
    app.use('/enrollments', enrollments)
    app.use('/people', people)
    app.use('/courses', courses)
}