/**
 * Helper function
 * @param {Array} arr - the array that will contain objects with success state of each validation
 * @param {String} prop - string which is either option or message
 * @returns {Array} propArr - Array containing props
 */
const getPropsFromObj = (arr, prop) => {
  const propArr = [];
  arr.forEach((object) => {
    if (!object.success) {
      propArr.push(object[prop]);
    }
  });
  return propArr;
};

/**
 * validate function
 * @param {Object} obj - Object which contains data to be validated and the validations to use at the data
 * @returns {Object} - Object which either contains a success boolean or a success false and an errorbag
 */
const validate = (obj) => {
  const validationPromisesArray = [];

  // for each validation in the array with validations
  // call that validation with the data
  // push that promise in the array
  obj.validations.forEach((validation) => {
    validationPromisesArray.push(validation(obj.data));
  });

  // check whether all the validations in the array resolve to true
  return Promise.all(validationPromisesArray).then((item) => {
    if (item.every((value) => value.success)) {
      return {
        success: true,
        options: getPropsFromObj(item, 'option')
      };
    }
    return {
      success: false,
      messages: getPropsFromObj(item, 'message')
    };

  })
};


module.exports = {validate};