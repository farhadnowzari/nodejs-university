import { NextFunction, Request, Response } from "express";

export function authorize(permission: string): (req: Request, res: Response, next: NextFunction) => Promise<void>;
export function authorize(permissionBuilder: (req: Request) => string): (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function authorize (permission: string | ((req: Request) => string)) {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (typeof permission === "function") {
            permission = permission(req);
        }
        if (!await req.httpContext.identity.authorize(permission)) {
            res.status(403).json({ message: "Forbidden" });
            return;
        }
        next();
    }
}

export const queryWithPermission = (permission: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const result = await req.httpContext.identity.permissions(permission);
        if(!result.authorized) {
            res.status(403).json({ message: "Forbidden" });
            return;
        }
        next();
    }
}