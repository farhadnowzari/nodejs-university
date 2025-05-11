import dbContext from "../contexts/dbContext";
import HttpContext from "../contexts/HttpContext";

export const createPersonCommandHandler = async (httpContext: HttpContext) => {
    const { request, response } = httpContext;
    const { title, firstName, lastName, userId } = request.body;
    const newPerson = await dbContext.person.create({
        data: {
            title,
            firstName,
            lastName,
            userId,
        },
    });
    return response.status(201).json(newPerson);
}