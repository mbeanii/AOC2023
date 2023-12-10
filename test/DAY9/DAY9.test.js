const { expect } = require('chai');
const {Day9} = require('../../DAY9/DAY9.js');

const test_day9 = new Day9("");
const live_day9 = new Day9("DAY9/input.txt");

describe('Day9.run', () => {
    it('should return 114 on test data', () => {
        expect(test_day9.run()).to.equal(114);
    });
});
