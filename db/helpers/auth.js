module.exports.checkAuthentication = (req, res, next) => {
  // middleware for routes requiring authorization
  if (req.isAuthenticated()) {
    // method exposed on req in passport
    return next();
  }
  return res.send(403);
};
