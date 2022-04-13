const isAuthorized = (req, res, next) => {
  res.locals.user = req.session?.user;
  res.locals.isAuthorized = req.session?.isAuthorized;
  console.log('requser', req.session.user);
  next();
};

module.exports = isAuthorized;
