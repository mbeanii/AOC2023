const { expect } = require('chai');
const {Hand, Day8} = require('../DAY8.js');

const test_day8 = new Day8("");
const live_day8 = new Day8("DAY8/input.txt");

describe('Day7.run', () => {
    it('should return PASTE_HERE on test data', () => {
        expect(test_day7.run()).to.equal(PASTE_HERE);
    });
});
