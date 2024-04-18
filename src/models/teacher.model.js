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

teacherSchema.statics.isEmailTaken = function (email) {
	return this.findOne({ email });
};

teacherSchema.statics.isNumberTaken = function (number) {
	return this.findOne({ number });
};

export default model('Teacher', teacherSchema);
