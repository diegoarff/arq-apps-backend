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
});

export default model('Subject', subjectSchema);
