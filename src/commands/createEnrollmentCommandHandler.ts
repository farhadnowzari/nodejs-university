import dbContext from "../contexts/dbContext";
import HttpContext from "../contexts/HttpContext";

export const createEnrollmentCommandHandler = async (httpContext: HttpContext) => {
    const { request, response } = httpContext;
    const { studentId, courseId } = request.body;

    // Create a new enrollment in the database
    const newEnrollment = await dbContext.enrollment.create({
        data: {
            courseId,
            studentId
        },
    });

    // Return the created enrollment
    return response.status(201).json(newEnrollment);
}