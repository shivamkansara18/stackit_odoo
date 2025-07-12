const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select('-password');
      if (!user || user.isBanned) {
        return res.status(403).json({ msg: 'Unauthorized or banned user' });
      }

      req.user = user; // Attach user to request
      next();
    } catch (err) {
      return res.status(401).json({ msg: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ msg: 'No token provided' });
  }
};

module.exports = protect;
