const validateAuth = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next({
      statusCode: 401,
      message: 'Token não encontrado',
    });
  }

  next();
};

module.exports = {
  validateAuth,
};
