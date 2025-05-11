import { createPersonCommandHandler } from "../commands/createPersonCommandHandler";
import { getPeopleListQueryHandler } from "../queries/getPeopleListQueryHandler";
import ControllerBase from "./ControllerBase";

export default class PeopleController extends ControllerBase {
    get() {
        getPeopleListQueryHandler(this.httpContext);
    }

    post() {
        createPersonCommandHandler(this.httpContext);
    }
}