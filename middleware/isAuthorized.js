const isAuthorized = (req, res, next) => {
  if (req.session) {
    res.locals.user = req.session?.user;
    console.log('session', req.session);
    res.locals.isAuthorized = req.session?.isAuthorized;
    console.log('locals', res.locals);
    next();
  }
};

module.exports = isAuthorized;
