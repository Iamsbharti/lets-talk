exports.response = (error, status, message, data) => {
  let res = {
    error: error,
    status: status,
    message: message,
    data: data,
  };
  return res;
};
