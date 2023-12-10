const { expect } = require('chai');
const {Day9} = require('../../DAY9/DAY9.js');

const test_day9 = new Day9("");
const live_day9 = new Day9("DAY9/input.txt");

part1_val = 114
part2_val = 2

val = part2_val

describe('Day9.run', () => {
    it(`should return ${val} on test data`, () => {
        expect(test_day9.run()).to.equal(val);
    });
});
