const { expect } = require('chai');
const { parse_input, get_points_for_card, run, run_part_2 } = require('../DAY4/DAY4.js');

var raw_input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card  2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card   3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card     4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

var parsed_input = null;

describe('parse_input', () => {
    parsed_input = parse_input(raw_input);

    it('should return an array of objects containing the same number of rows as the input', () => {
        expect(parsed_input.length).to.equal(6);
    });

    it('numbers_you_have should be a list of ints', () => {
        expect(parsed_input[0].numbers_you_have[0]).to.equal(83);
        for (let i = 0; i < parsed_input.length; i++) {
            for (let j = 0; j < parsed_input[i].numbers_you_have.length; j++) {
                expect(parsed_input[i].numbers_you_have[j]).to.be.a('number');
            }
        }
    });

    it('winning_numbers should be a list of ints', () => {
        expect(parsed_input[0].winning_numbers[0]).to.equal(41);
        for (let i = 0; i < parsed_input.length; i++) {
            for (let j = 0; j < parsed_input[i].winning_numbers.length; j++) {
                expect(parsed_input[i].winning_numbers[j]).to.be.a('number');
            }
        }
    });

    it('should have 186 rows when parsing input.txt', () => {
        let raw_file = require('fs').readFileSync('DAY4/input.txt', 'utf8');
        let parsed_input = parse_input(raw_file);
        expect(parsed_input.length).to.equal(186);
    });

    it('should have 10 winning numbers in each row when parsing input.txt', () => {
        let raw_file = require('fs').readFileSync('DAY4/input.txt', 'utf8');
        let parsed_input = parse_input(raw_file);
        for (let i = 0; i < parsed_input.length; i++) {
            expect(parsed_input[i].winning_numbers.length).to.equal(10);
        }
    });

    it('should have 25 numbers_you_have in each row when parsing input.txt', () => {
        let raw_file = require('fs').readFileSync('DAY4/input.txt', 'utf8');
        let parsed_input = parse_input(raw_file);
        for (let i = 0; i < parsed_input.length; i++) {
            expect(parsed_input[i].numbers_you_have.length).to.equal(25);
        }
    });
});

describe('get_points_for_card', () => {
    expected_points = [8, 2, 2, 1, 0, 0];
    it('rows should match expected', () => {
        for (let i = 0; i < expected_points.length; i++) {
            winning_numbers = parsed_input[i].winning_numbers;
            numbers_you_have = parsed_input[i].numbers_you_have;
            expect(get_points_for_card(winning_numbers, numbers_you_have)).to.equal(expected_points[i]);
        }
    });
});

describe('run', () => {
    it('run should return 13 when given puzzle_input', () => {
        expect(run(raw_input)).to.equal(13);
    });
});

describe('run_part_2', () => {
    it('run should return 30 when given puzzle_input', () => {
        expect(run_part_2(raw_input, true)).to.equal(30);
    });
});