import { Strategy, ExtractJwt } from 'passport-jwt';
import users from '../models/user.model.js'; // Import user model

// Passport Middleware
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'HeavenOrHell';

export default new Strategy(opts, async (payload, done) => {
	try {
		const user = await users.findOne({ username: payload.username });
		if (user) {
			return done(null, user);
		}
		return done(null, false);
	} catch (error) {
		console.log(error);
	}
});

// After import invoke and use it like this: passport.authenticate('jwt', { session: false })

/* Old Version
    const opts: StrategyOptions = {
    // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: ExtractJwt.fromBodyField("token"),
    secretOrKey: process.env.JWTSECRET,
    };

    export default new Strategy(opts, async function (payload, done) {
    try {
        const user = await users.findOne({ alias: payload.alias });
        if (user) {
        return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        console.log(error);
    }
    });

*/
