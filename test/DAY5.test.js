const { expect } = require('chai');
const { Day5 } = require('../DAY5/DAY5.js');

const test_day5 = new Day5("");
// const live_day5 = new Day5('DAY5/input.txt');

describe('Day5.run', () => {
    it('should return 13 on test data', () => {
        expect(test_day5.run()).to.equal(35);
    });
});
