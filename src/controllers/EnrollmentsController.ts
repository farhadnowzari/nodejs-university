import { createEnrollmentCommandHandler } from "../commands/createEnrollmentCommandHandler";
import { getEnrollmentListQueryHandler } from "../queries/getEnrollmentListQueryHandler";
import ControllerBase from "./ControllerBase";

export default class EnrollmentsController extends ControllerBase {
    get() {
        getEnrollmentListQueryHandler(this.httpContext);
    }
    post() {
        createEnrollmentCommandHandler(this.httpContext);
    }
}