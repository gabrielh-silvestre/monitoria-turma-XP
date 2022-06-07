const handler = (err, _req, res, _next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.log(err);
  return res.status(500).json({ message: 'Internal server error' });
};

module.exports = handler;
