export const validate = (schema) => {
	return async (req, res, next) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			next(error);
		}
	};
};
