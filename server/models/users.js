const db = require("../database");
const hashAndSaltHelper = require("../helpers/hashAndSalt");

class users {
  static async retrieveAll() {
    return await db.query("SELECT user_first_name from users").catch((err) => {
      console.log(err);
    });
  }

  static async checkExistsByEmail(user_email) {
    return await db
      .query("SELECT * FROM users WHERE user_email=$1", [user_email])
      .catch((err) => {
        console.log(err);
      });
  }

  static async checkExistsById(id) {
    return await db
      .query("SELECT * FROM users WHERE id=$1", [id])
      .catch((err) => {
        console.log(err);
      });
  }

  static async checkExistsByGoogleId(googleId) {
    return await db
      .query("SELECT * FROM users WHERE user_google_id=$1", [googleId])
      .catch((err) => {
        console.log(err);
      });
  }

  static async insert(user) {
    let {
      user_first_name,
      user_last_name,
      user_phone_number,
      user_email,
      user_password
    } = user;

    user_password = await hashAndSaltHelper.generateHashAndSalt(user_password);

    return await db
      .query(
        "INSERT INTO users (user_first_name, user_last_name, user_phone_number, user_email, user_password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          user_first_name,
          user_last_name,
          user_phone_number,
          user_email,
          user_password
        ]
      )
      .catch((err) => {
        console.log(err);
      });
  }

  static async insertGoogleProfile(user) {
    let { user_first_name, user_last_name, user_email, user_google_id } = user;

    return await db
      .query(
        "INSERT INTO users (user_first_name, user_last_name, user_email, user_google_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [user_first_name, user_last_name, user_email, user_google_id]
      )
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = users;
