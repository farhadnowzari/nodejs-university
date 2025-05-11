import dbContext from "../contexts/dbContext";
import HttpContext from "../contexts/HttpContext";

export const createCourseCommandHandler = async (httpContext: HttpContext) => {
    const { request, response } = httpContext;
    const { name } = request.body;

    const newCourse = await dbContext.course.create({
        data: {
            name,
        },
    });

    return response.status(201).json(newCourse);
}