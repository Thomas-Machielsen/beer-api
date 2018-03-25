const helpers = require('./helpers');

describe('it should return the params', () => {

    test('it should be callable', () => {
        expect(typeof helpers.getParams).toBe('function');
    });

    test('it should return an id when given an id', () => {
        // Arrange
        const id = '1';
        const mockData = { "id": ["1"] };

        // Act
        const result = helpers.getParams(id);

        // assert
        return expect(result).toEqual(mockData);
    });

    test('it should return an empty object when the id is undefined', () => {
        const id = undefined;
        const mockData = {};

        const result = helpers.getParams(id);

        return expect(result).toEqual(mockData);
    });
});