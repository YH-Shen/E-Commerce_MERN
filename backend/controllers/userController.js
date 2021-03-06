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
	// if cannot find user by email
	//  throw an error saying Invalid email
	// else if (user email exists and match password is successful)
	//  login, res.json
	// else
	// throw error saying invalid password
	if (!user) {
		res.status(401);
		throw new Error("Invalid email");
	} else if (user) {
		// if find user, then match password
		if (await user.matchPassword(password)) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			});
		} else {
			// error is about password
			res.status(401);
			throw new Error("Invalid password");
		}
	}

	// check if user exist, and password matches
	// if (user && (await user.matchPassword(password))) {
	// 	res.json({
	// 		_id: user._id,
	// 		name: user.name,
	// 		email: user.email,
	// 		isAdmin: user.isAdmin,
	// 		token: generateToken(user._id),
	// 	});
	// } else {
	// 	res.status(401);
	// 	throw new Error("Invalid email or password");
	// }
});

// @desc     Register a new user
// @routes   POST /api/users
// @access   Public Route
const registerUser = asyncHandler(async (req, res) => {
	// get data from body
	const { name, email, password, isAdmin } = req.body;

	// see if user exists
	const userExists = await User.findOne({ email });

	// throw an error if exists
	if (userExists) {
		//  400 is bad request
		res.status(400);
		throw new Error("User email taken");
	}

	// create user
	const user = await User.create({
		name,
		email,
		password,
		isAdmin,
	});
	// if user created
	if (user) {
		// 201(something is created) and send data
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// @desc     Get user profile
// @routes   GET /api/users/profile
// @access   Private Route
const getUserProfile = asyncHandler(async (req, res) => {
	// find user
	const user = await User.findById(req.user._id);

	if (user) {
		// return data for the logged in user
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}

	// res.send("success");
});

// @desc     Update user profile
// @routes   PUT /api/users/profile
// @access   Private Route
const updateUserProfile = asyncHandler(async (req, res) => {
	// find user
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		// if password is sent
		if (req.body.password) {
			user.password = req.body.password;
		}
		// use save method so that the presave encryption would be called
		const updatedUser = await user.save();

		// return data for the logged in user
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}

	// res.send("success");
});

// @desc     Get all users
// @routes   GET /api/users
// @access   Private Route/Admin only
const getUsers = asyncHandler(async (req, res) => {
	// get all users by pass in empty obj
	const users = await User.find({});
	res.json(users);

	// res.send("success");
});

// @desc     Delete a user
// @routes   DELETE /api/users/:id
// @access   Private Route/Admin only
const deleteUser = asyncHandler(async (req, res) => {
	// find the user by id
	const user = await User.findById(req.params.id);

	if (user) {
		// if user exists, delete
		await user.remove();
		res.json({ message: "User removed" });
	} else {
		res.status(404);
		throw new Error("User not found");
	}

	// res.send("success");
});

// @desc     Get user by ID
// @routes   GET /api/users/:id
// @access   Private Route/Admin only
const getUserById = asyncHandler(async (req, res) => {
	// get user by id, and then send user back
	const user = await User.findById(req.params.id).select("-password");

	// check if user found
	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error("User not found");
	}

	// res.send("success");
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin Only
const updateUser = asyncHandler(async (req, res) => {
	// find the user to update
	const user = await User.findById(req.params.id);

	if (user) {
		// change user name and email
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		// change if user is admin
		user.isAdmin = req.body.isAdmin;

		// save updated user
		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

export {
	authUser,
	getUserProfile,
	updateUserProfile,
	registerUser,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
};
