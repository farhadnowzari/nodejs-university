import { Request, Response } from "express";

export default class HttpContext {
    private _request: Request;
    private _response: Response;

    constructor(request: Request, response: Response) {
        this._request = request;
        this._response = response;
    }

    get request(): Request {
        return this._request;
    }

    get response(): Response {
        return this._response;
    }
}