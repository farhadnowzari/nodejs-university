import dbContext from "../contexts/dbContext";
import HttpContext from "../contexts/HttpContext";

export const getGradeListQueryHandler = async (httpContext: HttpContext) => {
    const { request, response } = httpContext;
    const { page, pageSize } = request.query;

    const pageNumber = parseInt(page as string) || 1;
    const pageSizeNumber = parseInt(pageSize as string) || 10;

    const offset = (pageNumber - 1) * pageSizeNumber;

    const totalGrades = await dbContext.grade.count();
    const totalPages = Math.ceil(totalGrades / pageSizeNumber);
    const grades = await dbContext.grade.findMany({
        take: pageSizeNumber,
        skip: offset,
    });
    const responseData = {
        totalGrades,
        totalPages,
        currentPage: pageNumber,
        pageSize: pageSizeNumber,
        grades,
    };
    response.status(200).json(responseData);
}