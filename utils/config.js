const configDefaults = require("../config/configDefaults");
const localConfig = require("../config/localConfig");
const merge = require("./merge");

const config = merge.mergeObjectsDeep({}, configDefaults, localConfig);

module.exports = { config };
