const isAuthorized = (req, res, next) => {
  if (req.session) {
    res.locals.user = req.session?.user;
    res.locals.isAuthorized = req.session?.isAuthorized;
    next();
  }
};

module.exports = isAuthorized;
