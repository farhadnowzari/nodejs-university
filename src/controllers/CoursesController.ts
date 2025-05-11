import { createCourseCommandHandler } from "../commands/createCourseCommandHandler";
import { getCourseListQueryHandler } from "../queries/getCourseListQueryHandler";
import ControllerBase from "./ControllerBase";

export default class CoursesController extends ControllerBase {
    get() {
        getCourseListQueryHandler(this.httpContext);
    }

    post() {
        createCourseCommandHandler(this.httpContext);
    }
}