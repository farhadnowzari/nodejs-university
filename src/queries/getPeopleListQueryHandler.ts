import dbContext from "../contexts/dbContext";
import HttpContext from "../contexts/HttpContext";

export const getPeopleListQueryHandler = async (httpContext: HttpContext) => {
    const { request, response } = httpContext;
    const { page, pageSize } = request.query;

    const pageNumber = parseInt(page as string) || 1;
    const pageSizeNumber = parseInt(pageSize as string) || 10;

    const offset = (pageNumber - 1) * pageSizeNumber;

    const totalPeople = await dbContext.person.count();
    const totalPages = Math.ceil(totalPeople / pageSizeNumber);
    const people = await dbContext.person.findMany({
        take: pageSizeNumber,
        skip: offset,
    });
    const responseData = {
        totalPeople,
        totalPages,
        currentPage: pageNumber,
        pageSize: pageSizeNumber,
        people,
    };
    response.status(200).json(responseData);
}