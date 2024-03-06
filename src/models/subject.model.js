import { Schema, model } from 'mongoose';

const subjectSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	term: {
		type: Number,
		required: true,
		trim: true,
	},
	university: {
		type: Schema.Types.ObjectId,
		ref: 'University',
	},
	teachers: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Teacher',
		},
	],
});

export default model('Subject', subjectSchema);
