const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");

const User = require("./models/users");
const hashAndSaltHelper = require("./helpers/hashAndSalt");

// JWT token strategy
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {
      try {
        const user = await User.checkExistsById(payload.sub);
        if (user.rows.length === 0) {
          return done(null, false);
        }
        done(null, user.rows[0]);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Google Oauth Strategy
passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists in DB
        const existingUser = await User.checkExistsByGoogleId(profile.id);
        if (existingUser.rows.length > 0) {
          return done(null, existingUser);
        }

        // new account
        const newUser = await User.insertGoogleProfile({
          user_google_id: profile.id,
          user_first_name: profile.name.givenName,
          user_last_name: profile.name.familyName,
          user_email: profile.emails[0].value
        });
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// local strategy
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "user_email",
      passwordField: "user_password"
    },
    async (username, password, done) => {
      try {
        // find user based on email
        const user = await User.checkExistsByEmail(username);

        if (user.rows.length === 0) {
          return done(null, true, { message: "Incorrect email" });
        }

        // check if password is correct
        const isValid = await hashAndSaltHelper.isValidPassword(
          password,
          user.rows[0].user_password
        );

        if (!isValid) {
          return done(null, true, { message: "Incorrect password" });
        }

        // return the user
        done(null, true, user.rows[0]);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
