const BeersService = require('./beers');


describe('Beers service to output data', () => {

    describe('getBeers', () => {


        test('should be callable', () => {
            expect(typeof BeersService.getBeer).toBe('function');
        });


        // Doesn't work always passes
        xtest('returns a promise when given a single ID', () => {
            const req = {};
            req.params = {id: '1'};

            return BeersService.getBeer(req).then(result => {
                expect(typeof result === 'object');
                expect(result.constructor === Promise);
            });
        });

        // Works
        test('resolves to mockdata', () => {

            const mockData = [{'Beer': 'testbier'}];

            const SequelizeMock = {
                fn: () => {
                },
                col: () => {
                }
            };

            const RatingSchemaMock = {
                associations: () => {
                }
            };

            const BeerSchemaMock = {
                Beer: {
                    findAll: () => {
                        return Promise.resolve(mockData);
                    }
                },
                associations: () => {
                }
            };

            const Beers = new BeersService(SequelizeMock, BeerSchemaMock, RatingSchemaMock, null);

            const req = {};
            req.params = {id: '1'};

            return expect(Beers.getBeer(req)).resolves.toEqual(mockData);

        });


    });

});