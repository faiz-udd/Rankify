const { User } = require('../../models/index');

const jwt = require('jsonwebtoken');


// Middleware function to verify JWT token and extract user
const authenticateJWT = async(req, res, next) => {

  // Check if the request is for the /login route
  if (req.path === '/login') {
    // Get the JWT token from the request headers
    const authHeader = req.headers.authorization;
    if (authHeader) {
      // Token is expected in the format: Bearer <token>
      const token = authHeader.split(' ')[1];
      // Verify the token
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          // Token verification failed
          return res.status(403).json({ error: 'Token verification failed' });
        }
        // Token verification succeeded, send "already logged in" response
        return res.status(400).json({ message: 'User is already logged in' });
      });
    } else {
      // If no token provided in the Authorization header, proceed normally
      next();
    }
  } else {
    // For all other routes, verify the JWT token as usual
    const authHeader = req.headers.authorization;
    if (authHeader) {
      // Token is expected in the format: Bearer <token>
      const token = authHeader.split(' ')[1];
      // Verify the token
      jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {
        if (err) {
          // Token verification failed
          // console.log(err);
          return res.status(403).json({ error: 'Token verification failed' });
        }
        // Token verification succeeded, user information is extracted from the token
        // lets get all user details from dbm we will need them


        user = await User.findByPk(user.user.email);
        
        if(!user) {
            return res.status(403).json({ error: 'Token verification failed' });
        }
        // now req.user contain actual user details, dept , faculty,etc

        req.user = user.dataValues;
        next();
      });
    } else {
      // If no token provided in the Authorization header
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
  }
};

module.exports = authenticateJWT;