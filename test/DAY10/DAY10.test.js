const { expect } = require('chai');
const {Day10} = require('../../DAY10/DAY10.js');

const test_day10 = new Day10("");
const live_day10 = new Day10("DAY10/input.txt");

part1_val = 4
part2_val = "PASTE_HERE"

val = part1_val

describe('Day10.run', () => {
    it(`should return ${val} on test data`, () => {
        expect(test_day10.run()).to.equal(val);
    });
});

