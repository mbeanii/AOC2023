const { expect } = require('chai');
const {Day11} = require('../../DAY11/DAY11.js');

const test_day11 = new Day11("");
const live_day11 = new Day11("DAY11/input.txt");

part1_val = "PASTE_HERE"
part2_val = "PASTE_HERE"

val = part1_val

describe('Day11.run', () => {
    it(`should return ${val} on test data`, () => {
        expect(test_day11.run()).to.equal(val);
    });
});

