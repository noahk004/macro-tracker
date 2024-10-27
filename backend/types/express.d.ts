import { UserData } from "./user";
import { Request } from "express"

export interface CustomRequest extends Request {
    user?: User; // Add `user` as an optional field of type `User`
}