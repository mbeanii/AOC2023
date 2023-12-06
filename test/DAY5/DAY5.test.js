const { expect } = require('chai');
const { Day5 } = require('../../DAY5/DAY5.js');

const test_day5 = new Day5("");

function mapsEqual(map1, map2) {
    if (map1.size !== map2.size) return false;
    for (let [key, val] of map1) {
        if (!map2.has(key) || map2.get(key) !== val) {
            return false;
        }
    }
    return true;
  }

describe('Day5.run', () => {
    it('should return 35 on test data', () => {
        expect(test_day5.run()).to.equal(35);
    });
});

describe('Day5.parse_input', () => {
    it('should populate the maps property with a list of 7 int:int map functions', () => {
        expect(test_day5.mapping_functions.length).to.equal(7);
        for (let i = 0; i < test_day5.mapping_functions.length; i++) {
            expect(test_day5.mapping_functions[i]).to.be.a('function');
        }
    });
});

describe('Day5.parse_input', () => {
    it('should populate the "seeds" property with a list of ints (79 14 55 13)', () => {
        console.log(test_day5.seeds)
        expected_list = [79, 14, 55, 13];
        expect(test_day5.seeds.length).to.equal(4);
        for (let i = 0; i < expected_list.length; i++) {
            expect(test_day5.seeds[i]).to.equal(expected_list[i]);
        }
    });
});

describe('Day5.parse_input', () => {
    it('The first map (seed-to-soil) should match the given values', () => {
        console.log(test_day5.mapping_functions[0])
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
            expect(test_day5.mapping_functions[0](key)).to.equal(val)
        }
    });
});
