import { createGradeCommandHandler } from "../commands/createGradeCommandHandler";
import { getGradeListQueryHandler } from "../queries/getGradeListQueryHandler";
import ControllerBase from "./ControllerBase";

export default class GradesController extends ControllerBase {
    get() {
        getGradeListQueryHandler(this.httpContext)
    }
    post() {
        createGradeCommandHandler(this.httpContext);
    }
}