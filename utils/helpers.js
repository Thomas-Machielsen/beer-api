const getWhereStatement = (id) => {
    let whereStatement = {};
    return id ? whereStatement = { id: [id] } : whereStatement = {};
};

module.exports = { getWhereStatement };