import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
	{
		name: {
			// mongoose provides type checking
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

// password authentication
userSchema.methods.matchPassword = async function (enteredPassword) {
	// enteredPassword is plain text
	// use bcrypt to compare it with the hashed password in database
	return await bcrypt.compare(enteredPassword, this.password);
};

// add middleware to encrypt password before saving
userSchema.pre("save", async function (next) {
	// only runs if password sent
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	// hash password with salt generated
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
