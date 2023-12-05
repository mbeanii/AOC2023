const { expect } = require('chai');
const { Day5 } = require('../DAY5/DAY5.js');

const test_day5 = new Day5("");
const live_day5 = new Day5('DAY5/input.txt');

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
    it('should populate the maps property with a list of 7 int:int maps', () => {
        expect(test_day5.maps.length).to.equal(7);
        for (let i = 0; i < test_day5.maps.length; i++) {
            expect(test_day5.maps[i]).to.be.a('map');
        }
    });
});

describe('Day5.parse_input', () => {
    it('should populate the "seeds" property with a list of ints (79 14 55 13)', () => {
        expected_list = [79, 14, 55, 13];
        expect(test_day5.seeds.length).to.equal(4);
        for (let i = 0; i < expected_list.length; i++) {
            expect(test_day5.seeds[i]).to.equal(expected_list[i]);
        }
    });
});

describe('Day5.parse_input', () => {
    it('The first map (seed-to-soil) should match the given values', () => {
        expected_seed_to_soil = new Map();
        for (i = 0; i < 50; i++) {
            expected_seed_to_soil.set(i, i);
        }
        for (i = 50; i < 99; i++) {
            expected_seed_to_soil.set(i, i + 2);
        }
    });
});

describe('Day5.parse_input', () => {
    it('The maps should be unique', () => {
        for (let i = 0; i < test_day5.maps.length; i++) {
            for (let j = 0; j < test_day5.maps.length; j++) {
                if (i != j) {
                    expect(mapsEqual(test_day5.maps[i], test_day5.maps[j])).to.be.false;
                }
            }
        }
    });
});

describe('Day5.parse_input', () => {
    it('Every map should contain at least one unique key/value (ie., not all 1:1, 2:2, etc.)', () => {
        for (let i = 0; i < test_day5.maps.length; i++) {
            at_least_one_unique = false;
            for (let [key, val] of test_day5.maps[i]) {
                if (key !== val) {
                    at_least_one_unique = true;
                    break;
                }
            }
            expect(at_least_one_unique).to.be.true;
        }
    });
});
