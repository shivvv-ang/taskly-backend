import jwt from "jsonwebtoken";
import {ApiError} from "../utils/utils.js";

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            return next(new ApiError(401, "Authentication required"));
        }

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.user = {
            id: decoded.userId,
            email: decoded.email,
        };

        next();
    } catch (error) {
        return next(new ApiError(401, "Invalid or expired token"));
    }
};

export default authenticate;
