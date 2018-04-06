const validations = require('./validations');

describe('validation functions', () => {

  describe('isTokenDefined', () => {

    test('it should resolve to an object with success: true message when a token has been provided', () => {
      const mockData = {success: true};
      const token = 'reallyLongTokenString';

      const result = validations.isTokenDefined(token);

      return expect(result).resolves.toEqual(mockData);
    });

    test('it should resolve to an object with success: false and an error message when a token has not been provided', () => {
      const mockData = {
        success: false,
        message: 'No token provided.'
      };
      const token = undefined;

      const result = validations.isTokenDefined(token);

      return expect(result).resolves.toEqual(mockData);
    });

  });

});