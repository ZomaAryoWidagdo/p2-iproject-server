"use strict";

const error = (err, req, res, next) => {
  res.status(503).json({
    message: "Service Temporarily Unavailable",
  });
};

module.exports = error;
