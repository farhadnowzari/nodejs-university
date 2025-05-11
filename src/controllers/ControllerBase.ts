import HttpContext from "../contexts/HttpContext";

export default abstract class ControllerBase {
    httpContext: HttpContext;
    constructor(httpContext: HttpContext) {
        this.httpContext = httpContext;
    }
}