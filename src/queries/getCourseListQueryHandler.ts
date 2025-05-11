import dbContext from "../contexts/dbContext";
import HttpContext from "../contexts/HttpContext";

export const getCourseListQueryHandler = async (httpContext: HttpContext) => {
    const { request, response } = httpContext;
    const { page, pageSize } = request.query;

    const pageNumber = parseInt(page as string) || 1;
    const pageSizeNumber = parseInt(pageSize as string) || 10;

    const offset = (pageNumber - 1) * pageSizeNumber;

    const totalCourses = await dbContext.course.count();
    const totalPages = Math.ceil(totalCourses / pageSizeNumber);
    const courses = await dbContext.course.findMany({
        take: pageSizeNumber,
        skip: offset,
    });
    const responseData = {
        totalCourses,
        totalPages,
        currentPage: pageNumber,
        pageSize: pageSizeNumber,
        courses,
    };
    response.status(200).json(responseData);
}