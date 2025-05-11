import dbContext from "../contexts/dbContext";
import HttpContext from "../contexts/HttpContext";

export const createGradeCommandHandler = async (httpContext: HttpContext) => {
    const { request, response } = httpContext;
    const { value, enrollmentId, professorId } = request.body;
    const newGrade = await dbContext.grade.create({
        data: {
            value: value,
            enrollmentId: enrollmentId,
            professorId: professorId,
        },
    });
    response.status(201).json(newGrade);
}