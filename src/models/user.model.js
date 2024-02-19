import 'dotenv/config.js';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: Schema.Types.ObjectId,
			ref: 'Role',
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.createToken = function () {
	return jwt.sign(
		{ id: this._id, username: this.username },
		process.env.JWT_SECRET || 'secret'
	);
};

export default model('User', userSchema);
