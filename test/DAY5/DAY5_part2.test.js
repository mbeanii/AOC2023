const { expect } = require('chai');
const { Day5 } = require('../../DAY5/DAY5_part2.js');

const test_pt2_day5 = new Day5("");

function mapsEqual(map1, map2) {
    if (map1.size !== map2.size) return false;
    for (let [key, val] of map1) {
        if (!map2.has(key) || map2.get(key) !== val) {
            return false;
        }
    }
    return true;
  }

describe('part2 DAY5.run', () => {
    it('should return 46 on test data', () => {
        expect(test_pt2_day5.run()).to.equal(46);
    });
});

describe('part2 DAY5.parse_input', () => {
    it('should populate the maps property with a list of 7 int:int map functions', () => {
        expect(test_pt2_day5.mapping_functions.length).to.equal(7);
        for (let i = 0; i < test_pt2_day5.mapping_functions.length; i++) {
            expect(test_pt2_day5.mapping_functions[i]).to.be.a('function');
        }
    });
});

describe('part2 DAY5.parse_input', () => {
    it('seed_generator should yield the expected values for part 2', () => {
        expected_list = []
        for (let i = 0; i < 14; i++) {
            expected_list.push(79 + i);
        }
        for (let i = 0; i < 13; i++) {
            expected_list.push(55 + i);
        }
        expect(expected_list.length).to.equal(27);
        for (const seed of test_pt2_day5.seed_generator()) {
            expect(seed).to.equal(expected_list.shift());
        }
        expect(expected_list.length).to.equal(0);
    });
});

describe('part2 DAY5.parse_input', () => {
    it('The first map (seed-to-soil) should match the given values', () => {
        console.log(test_pt2_day5.mapping_functions[0])
        let expected_seed_to_soil = new Map();
        for (i = 0; i < 50; i++) {
            expected_seed_to_soil.set(i, i);
        }
        for (i = 50; i < 98; i++) {
            expected_seed_to_soil.set(i, i + 2);
        }
        for (i = 98; i < 100; i++) {
            expected_seed_to_soil.set(i, i - 48);
        }

        for (let [key, val] of expected_seed_to_soil) {
            expect(test_pt2_day5.mapping_functions[0](key)).to.equal(val)
        }
    });
});
