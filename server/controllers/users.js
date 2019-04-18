const JWT = require("jsonwebtoken");
const User = require("../models/users");

signToken = (user) => {
  return JWT.sign(
    {
      iss: "bulma-login-react-hooks",
      sub: user.id,
      iat: new Date().getTime(), //signed at
      exp: new Date().setDate(new Date().getDate() + 1) //expires at
    },
    process.env.JWT_SECRET
  );
};

module.exports = {
  register: async (req, res, next) => {
    const {
      user_first_name,
      user_last_name,
      user_phone_number,
      user_email,
      user_password
    } = req.value.body;

    // Check user already exists with same email
    const result = await User.checkExistsByEmail(user_email);

    if (result.rows.length > 0) {
      return res.status(403).json({ error: "Email is already in use" });
    }

    // Create new user in pg db
    const newUser = await User.insert({
      user_first_name,
      user_last_name,
      user_phone_number,
      user_email,
      user_password
    });

    // Generate the token
    const token = signToken(newUser.rows[0]);

    // Respond with token
    res.status(200).json({ token });
  },

  login: async (req, res, next) => {
    const error = req.authInfo.message;
    if (error) {
      return res.status(401).json({ error });
    }

    const token = signToken(req.user);
    res.status(200).json({ token });
    console.log("Successfully logged in!");
  },

  googleOAuth: async (req, res, next) => {
    const token = signToken(req.user.rows[0]);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    res.json({ secret: "resource" });
  }
};
