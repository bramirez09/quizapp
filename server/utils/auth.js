const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

        // Check if the token is in the authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
          // Remove the "Bearer " prefix from the token
          token = req.headers.authorization.split(" ")[1];
        }

    if (!token) {
      return req;
    }

        // verify token and get user data out of it
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch (error) {
            console.log('Invalid token', error.message);
        }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};


