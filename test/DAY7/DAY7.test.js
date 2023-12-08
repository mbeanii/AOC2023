const { expect } = require('chai');
const { Hand, Day7 } = require('../../DAY7/DAY7.js');

const test_day7 = new Day7("");

describe('Hand.calculateSortStrength', () => {
    it('should set sort_strength to 3479 given AAAAA', () => {
        expect(new Hand("AAAAA", 0).sort_strength).to.equal(3479);
    });
});

describe('Day7.run', () => {
    it('should return 6440 on test data', () => {
        expect(test_day7.run()).to.equal(6440);
    });
});
