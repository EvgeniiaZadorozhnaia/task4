const jwtConfig = require('./jwtConfig');

module.exports = {
  access: {
    maxAge: jwtConfig.access.expiresIn,
    httpOnly: true,
    sameSite: "Lax",
  },
  refresh: {
    maxAge: jwtConfig.refresh.expiresIn,
    httpOnly: true,
    sameSite: "Lax",
  },
};
