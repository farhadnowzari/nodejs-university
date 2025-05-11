import dbContext from "../contexts/dbContext";
import HttpContext from "../contexts/HttpContext";

export const getEnrollmentListQueryHandler = async (httpContext: HttpContext) => {
    const { request, response } = httpContext;
    const { page, pageSize } = request.query;

    const pageNumber = parseInt(page as string) || 1;
    const pageSizeNumber = parseInt(pageSize as string) || 10;

    const offset = (pageNumber - 1) * pageSizeNumber;

    const totalEnrollments = await dbContext.enrollment.count();
    const totalPages = Math.ceil(totalEnrollments / pageSizeNumber);
    const enrollments = await dbContext.enrollment.findMany({
        take: pageSizeNumber,
        skip: offset,
    });
    const responseData = {
        totalEnrollments,
        totalPages,
        currentPage: pageNumber,
        pageSize: pageSizeNumber,
        enrollments,
    };
    response.status(200).json(responseData);
}