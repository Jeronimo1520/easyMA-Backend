const bcrypt = require("bcrypt");

const saltRounds = 10;

const generateHash = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

const compareHash = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = { generateHash, compareHash };