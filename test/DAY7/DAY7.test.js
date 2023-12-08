const { expect } = require('chai');
const { Day7 } = require('../../DAY7/DAY7.js');

const test_day7 = new Day7("");
const live_day7 = new Day7("DAY7/input.txt");

describe('Day7.parseInput', () => {
    it('should have the same number of rows as the input', () => {
        expect(test_day7.hands.length).to.equal(5);
        expect(live_day7.hands.length).to.equal(1000);
    });
    it('should have a wager of 421 on the first row', () => {
        expect(live_day7.hands[0].wager).to.equal(421);
    });
    it('should have a sort_strength of 3,585,535 on the first row', () => {
        expect(live_day7.hands[0].sort_strength).to.equal(3585535);
    });
    it('should have a type of "Three of a Kind" on the first row', () => {
        expect(live_day7.hands[0].type.name).to.equal("Three of a Kind");
    });
    it('should have a value of 4 on the first row', () => {
        expect(live_day7.hands[0].type.value).to.equal(4);
    });
    it('should have all cards be strings of length 5 - test data', () => {
        let all_cards = test_day7.hands.map(hand => hand.cards).flat();
        let all_card_lengths = all_cards.map(card => card.length);
        expect(all_card_lengths.every(length => length == 5)).to.equal(true);
    });
    it('should have all cards be strings of length 5 - live data', () => {
        let all_cards = live_day7.hands.map(hand => hand.cards).flat();
        let all_card_lengths = all_cards.map(card => card.length);
        expect(all_card_lengths.every(length => length == 5)).to.equal(true);
    });
});

describe('Day7.run', () => {
    it('should return 6440 on test data', () => {
        expect(test_day7.run()).to.equal(6440);
    });
});


describe('Day7.run part 2', () => {
    it('should return 5905 on test data', () => {
        expect(test_day7.run()).to.equal(5905);
    });
});
