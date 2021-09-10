import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// Express async handler: Simple middleware for handling 
//      exceptions inside of async express routes and passing 
//      them to your express error handlers.

// @desc     Auth user & get token
//           Authenticated the user, validate email & password, 
//           then send back some data/token.
//           Token will be saved on the client 
//           and can be used to access protected routes later. 
// 
// @routes   POST /api/users/login
// @access   Public Route
const authUser = asyncHandler(async (req, res) => {
    // get data from body
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    // check if user exist, and password matches
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
})

// @desc     Register a new user
// @routes   POST /api/users
// @access   Public Route
const registerUser = asyncHandler(async (req, res) => {

    // get data from body
    const { name, email, password } = req.body;

    // see if user exists
    const userExists = await User.findOne({ email });

    // throw an error if exists
    if (userExists) {
        //  400 is bad request
        res.status(400);
        throw new Error("User email taken")
    }

    // create user
    const user = await User.create({
        name, email, password
    })
    // if user created
    if (user) {
        // 201(something is created) and send data
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
})

// @desc     Get user profile 
// @routes   GET /api/users/profile
// @access   Private Route
const getUserProfile = asyncHandler(async (req, res) => {

    // find user
    const user = await User.findById( req.user._id );

    if (user) {
        // return data for the logged in user
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error("User not found");
    }

    // res.send("success");
})

export { authUser, getUserProfile, registerUser }