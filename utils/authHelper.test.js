const authHelpers = require("./authHelper");

describe("several authhelper functions", () => {
  describe("returnToken", () => {
    test("it should provide a token when an user has been provided", () => {
      // arrange
      const user = { username: "bert" };
      const mockData = { token: "token" };

      // act
      const jwt = {
        sign: () => {
          return mockData;
        }
      };

      const result = authHelpers.returnToken(user, jwt);

      // assert
      return expect(result).resolves.toEqual(mockData);
    });

    test("it should reject with an error message when the user is null", () => {
      const user = null;
      const mockData = { message: "Failed authenticating.", success: false };

      const result = authHelpers.returnToken(user, null);

      return expect(result).rejects.toEqual(mockData);
    });
  });

  describe("findToken", () => {
    test("it returns undefined when no token has been provided", () => {
      const mockData = undefined;
      const req = {
        body: {},
        query: {},
        headers: {}
      };

      const result = authHelpers.findToken(req);

      return expect(result).toEqual(mockData);
    });

    test("it returns a token when a token is provided", () => {
      const mockData = "reallyLongString";
      const req = {
        body: {
          token: "reallyLongString"
        },
        query: {},
        headers: {}
      };

      const result = authHelpers.findToken(req);

      return expect(result).toEqual(mockData);
    });
  });

  describe("generateTokenToValidate", () => {
    test("it returns an object with data and an array of validations", () => {
      const mockData = {
        data: "reallyLongTokenString",
        validations: []
      };
      const token = "reallyLongTokenString";
      const validations = [];

      const result = authHelpers.generateTokenToValidate(token, validations);

      return expect(result).toEqual(mockData);
    });
  });
});
