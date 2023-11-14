const JWT = require("jsonwebtoken");

const SECRET = "f865b53623b121fd34ee5426c792e5c33af8c227";

const createToken = (payload) => {
  return JWT.sign(payload, SECRET, { expiresIn: "40m" });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    throw { ok: false, info: error };
  }
};

module.exports = { createToken, verifyToken };
