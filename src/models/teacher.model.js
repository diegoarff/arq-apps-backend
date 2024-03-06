import { Schema, model } from 'mongoose';
import { toJSON } from './plugins/index.js';

const teacherSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		number: {
			type: String,
			required: true,
			unique: true,
		},
		university: {
			type: Schema.Types.ObjectId,
			ref: 'University',
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

teacherSchema.plugin(toJSON);

teacherSchema.methods.isEmailTaken = async function (email) {
	const teacher = await this.constructor.findOne({ email });
	return !!teacher;
};

teacherSchema.methods.isNumberTaken = async function (number) {
	const teacher = await this.constructor.findOne({ number });
	return !!teacher;
};

export default model('Teacher', teacherSchema);
