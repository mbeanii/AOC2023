const fs = require('fs');

function parse_input(input) {
    let parsed_input = [];
    let lines = input.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let card = line.split(':');
        let card_numbers = card[1].split('|');
        let winning_numbers = card_numbers[0].trim().split(/\s+/).map(num => parseInt(num));
        let numbers_you_have = card_numbers[1].trim().split(/\s+/).map(num => parseInt(num));
        parsed_input.push({
            winning_numbers: winning_numbers,
            numbers_you_have: numbers_you_have
        });
    }

    return parsed_input;
}

function get_winners_for_card(winning_numbers, numbers_you_have) {
    winners = 0;
    for (let i = 0; i < winning_numbers.length; i++) {
        if (numbers_you_have.includes(winning_numbers[i])) {
            winners++;
        }
    }
    return winners;
}

function get_points_for_card(winning_numbers, numbers_you_have) {
    get_winners_for_card(winning_numbers, numbers_you_have)
    return parseInt(2 ** (winners-1));
}

function run(raw_file) {
    let parsed_input = parse_input(raw_file);
    points = 0;
    for (let i = 0; i < parsed_input.length; i++) {
        winning_numbers = parsed_input[i].winning_numbers;
        numbers_you_have = parsed_input[i].numbers_you_have;
        points += get_points_for_card(winning_numbers, numbers_you_have);
    }
    return points;
}

function run_part_2(raw_file) {
    let parsed_input = parse_input(raw_file);
    let row_totals = {};
    for (let i = 0; i < parsed_input.length; i++) {
        row_totals[i] = 1;
    }
    for (let i = 0; i < parsed_input.length; i++) {
        winning_numbers = parsed_input[i].winning_numbers;
        numbers_you_have = parsed_input[i].numbers_you_have;
        winners = get_winners_for_card(winning_numbers, numbers_you_have);
        for (let j = 1; j < winners + 1; j++) {
            row_totals[i+j] += row_totals[i];
        }
    }
    let grand_total = Object.values(row_totals).reduce((a, b) => a + b, 0);
    return grand_total;
}

raw_file = fs.readFileSync('DAY4/input.txt', 'utf8');
console.log(run(raw_file));
console.log(run_part_2(raw_file));

module.exports = { parse_input, get_points_for_card, run, run_part_2 };