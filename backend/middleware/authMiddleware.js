import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//  validate token to protect private route
const protect = asyncHandler(async (req, res, next) => {
    let token
    // send token through headers

    if (req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")) {
            try {
                token = req.headers.authorization.split(" ")[1];
                // decode token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                // not passing password, assign data according to id
                // and now we can use req.user in any protected route
                req.user = await User.findById(decoded.id).select("-password");

                next();
            } catch (error) {
                console.error(error);
                res.status(401);
                throw new Error("Not authorized, token failed")
            }
    }

    // if no token response 401 and throw an error
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
})

export { protect };