import { Schema, model } from 'mongoose';

const roleSchema = new Schema(
	{
		descrip: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model('Role', roleSchema);
