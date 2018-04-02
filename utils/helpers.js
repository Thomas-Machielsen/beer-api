const getParams = id => {
  return id ? { id: [id] } : {};
};

module.exports = { getParams };
