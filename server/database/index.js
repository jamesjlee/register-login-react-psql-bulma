var { Pool } = require("pg");
const dotEnv = require("dotenv").config();

let CONNECTION_STRING;
let SSL;

if (process.env.NODE_ENV === "test") {
  CONNECTION_STRING =
    process.env.DATABASE_URL ||
    `postgresql://${process.env.DATABASE_USR}:${
      process.env.DATABASE_PWD
    }@localhost:5432/bulma-login-react-hooks-test-db`;

  SSL = process.env.NODE_ENV == "production";
} else {
  CONNECTION_STRING =
    process.env.DATABASE_URL ||
    `postgresql://${process.env.DATABASE_USR}:${
      process.env.DATABASE_PWD
    }@localhost:5432/bulma-login-react-hooks-db`;

  SSL = process.env.NODE_ENV == "production";
}

class Database {
  constructor() {
    this._pool = new Pool({
      connectionString: CONNECTION_STRING,
      ssl: SSL
    });
  }

  query(text, params) {
    return this._pool.query(text, params);
  }

  end() {
    this._pool.end();
  }
}

module.exports = new Database();
