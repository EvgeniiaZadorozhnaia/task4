function removeHeader(req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
}

module.exports = removeHeader;
