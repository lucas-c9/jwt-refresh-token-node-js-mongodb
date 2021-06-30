require('dotenv').config();
module.exports = {
  secret: process.env.AUTHORIZATION_SECRET,
  jwtExpiration: 3600,         // 1 hour
  jwtRefreshExpiration: 86400, // 24 hours

  /* for test */
  // jwtExpiration: 30,          // 1 minute
  // jwtRefreshExpiration: 120,  // 2 minutes
};
