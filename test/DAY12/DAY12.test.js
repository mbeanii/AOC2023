const { expect } = require('chai');
const {Day12} = require('../../DAY12/DAY12.js');

const test_day12 = new Day12("");
const live_day12 = new Day12("DAY12/input.txt");

part1_val = 21
part2_val = "PASTE_HERE"

val = part1_val

describe('Day12.run', () => {
    it(`should return ${val} on test data`, () => {
        expect(test_day12.run()).to.equal(val);
    });
});

describe('Day12 constructor parse_input', () => {
    it(`parsed_input should equal a list of rows and a list of numbers`, () => {
        result = test_day12.parsed_input
        expect(result.rows).to.deep.equal(
            ["???.###",
            ".??..??...?##.",
            "?#?#?#?#?#?#?#?",
            "????.#...#...",
            "????.######..#####.",
            "?###????????"]);
        expect(result.values).to.deep.equal(
            [
                [1,1,3],
                [1,1,3],
                [1,3,1,6],
                [4,1,1],
                [1,6,5],
                [3,2,1]
            ]);
    });
});

describe('Day12.productSum', () => {
    it(`It should return the sum of each row's column product `, () => {
        var test_arr = [[2, 4, 6], [1, 2, 3], [1, 1, 1]]
        var expected = (2 * 4 * 6) + (1 * 2 * 3) + (1 * 1 * 1)
        expect(test_day12.productSum(test_arr)).to.equal(expected);
    });
})