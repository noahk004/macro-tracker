import { Response, NextFunction } from "express"
import { CustomRequest } from "../../types/express";
import { validateToken } from "../util/auth";

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const jwt = req.cookies.jwt;
    if (!jwt) {
        res.status(401).send("Unauthorized: No token provided.")
        return;
    }

    const userData = validateToken(jwt);
    if (!userData) {
        res.status(403).send("Invalid or expired token");
        return;
    }

    req.user = userData;
    next();
}