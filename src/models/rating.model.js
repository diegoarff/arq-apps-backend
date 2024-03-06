import { Schema, model } from 'mongoose';

const ratingSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		subject: {
			type: Schema.Types.ObjectId,
			ref: 'Subject',
			required: true,
		},
		value: {
			type: Number,
			required: true,
		},
		teacher: {
			type: Schema.Types.ObjectId,
			ref: 'Teacher',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default model('Rating', ratingSchema);
