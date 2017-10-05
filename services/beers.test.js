const beers = require('./beers');

const can = {
    ounces: 12,
};

describe('the can', () => {
    test('has 12 ounces', () => {
        expect(can.ounces).toBe(12);
    });
});
