const sendSuccessResponse = (req, res, status, message, data) => {
  console.log(
    "Success Resposne sent => ",
    req.path,
    " data => ",
    JSON.stringify(data)
  );
  return res.status(status).json({
    status,
    message,
    data,
  });
};

const sendErrorResponse = (req, res, status, message, data) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

const joierrors = (req, res, status, message, err) => {
  let error = err.details.reduce((prev, curr) => {
    prev[curr.path[0]] = curr.message.replace(/"/g, "");
    return prev;
  }, {});

  return res.status(status).json({
    status,
    message,
    error,
    
  });
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
  joierrors,
};
