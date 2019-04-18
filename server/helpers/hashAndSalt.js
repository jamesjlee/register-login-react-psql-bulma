const bcrypt = require("bcryptjs");

module.exports = {
  generateHashAndSalt: async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      return passwordHash;
    } catch (error) {
      throw new Error(error);
    }
  },

  isValidPassword: async (password, passwordHash) => {
    try {
      return await bcrypt.compare(password, passwordHash);
    } catch (error) {
      throw new Error(error);
    }
  }
};
