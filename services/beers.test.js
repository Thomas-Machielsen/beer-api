const BeersService = require("./beers");

describe("Beers service to output data", () => {
  describe("getBeers", () => {
    test("should be callable", () => {
      const mockData = [{ Beer: "testbier" }];

      const SequelizeMock = {
        fn: () => {},
        col: () => {}
      };

      const RatingSchemaMock = {
        associations: () => {}
      };

      const BeerSchemaMock = {
        Beer: {
          findAll: () => {
            return Promise.resolve(mockData);
          }
        },
        associations: () => {}
      };

      const Beers = new BeersService(
        SequelizeMock,
        BeerSchemaMock,
        RatingSchemaMock,
        null
      );

      expect(typeof Beers.getBeer).toBe("function");
    });

    test("returns a promise", () => {
      const mockData = [{ Beer: "testbier" }];

      const SequelizeMock = {
        fn: () => {},
        col: () => {}
      };

      const RatingSchemaMock = {
        associations: () => {}
      };

      const BeerSchemaMock = {
        Beer: {
          findAll: () => {
            return Promise.resolve(mockData);
          }
        },
        associations: () => {}
      };

      const Beers = new BeersService(
        SequelizeMock,
        BeerSchemaMock,
        RatingSchemaMock,
        null
      );

      const req = {};
      req.params = { id: "1" };

      return Beers.getBeer(req).then(result => {
        expect(typeof result === "object");
        expect(result.constructor === Promise);
      });
    });

    test("resolves to mockdata", () => {
      const mockData = [{ Beer: "testbier" }];

      const SequelizeMock = {
        fn: () => {},
        col: () => {}
      };

      const RatingSchemaMock = {
        associations: () => {}
      };

      const BeerSchemaMock = {
        Beer: {
          findAll: () => {
            return Promise.resolve(mockData);
          }
        },
        associations: () => {}
      };

      const Beers = new BeersService(
        SequelizeMock,
        BeerSchemaMock,
        RatingSchemaMock,
        null
      );

      const req = {};
      req.params = { id: "1" };

      return expect(Beers.getBeer(req)).resolves.toEqual(mockData);
    });

    test("reject to mockdata", () => {
      const mockData = new Error("No beers found");

      const SequelizeMock = {
        fn: () => {},
        col: () => {}
      };

      const RatingSchemaMock = {
        associations: () => {}
      };

      const BeerSchemaMock = {
        Beer: {
          findAll: () => {
            return Promise.reject(mockData);
          }
        },
        associations: () => {}
      };

      const Beers = new BeersService(
        SequelizeMock,
        BeerSchemaMock,
        RatingSchemaMock,
        null
      );

      const req = {};
      req.params = { id: "1" };

      return expect(Beers.getBeer(req)).rejects.toEqual(mockData);
    });
  });
});
