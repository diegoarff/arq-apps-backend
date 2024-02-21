import { Schema, model } from 'mongoose';

// postBody
/*
    {
        user
        subject
        post_title
        post_content
    }
*/

const postSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		subject: {
			type: Schema.Types.ObjectId,
			ref: 'Subject',
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model('Post', postSchema);
