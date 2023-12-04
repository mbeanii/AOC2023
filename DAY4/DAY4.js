function parse_input(input) {
    let parsed_input = [];
    let lines = input.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let card = line.split(':');
        let card_numbers = card[1].split('|');
        let winning_numbers = card_numbers[0].trim().split(' ').map(num => parseInt(num));
        let numbers_you_have = card_numbers[1].trim().split(' ').map(num => parseInt(num));
        parsed_input.push({
            winning_numbers: winning_numbers,
            numbers_you_have: numbers_you_have
        });
    }

    return parsed_input;
}

function get_points_for_card(winning_numbers, numbers_you_have) {
    winners = 0;
    for (let i = 0; i < winning_numbers.length; i++) {
        if (numbers_you_have.includes(winning_numbers[i])) {
            winners++;
        }
    }
    return parseInt(2 ** (winners-1));
}

function run(card) {
    let parsed_input = parse_input(card);
    points = 0;
    for (let i = 0; i < parsed_input.length; i++) {
        winning_numbers = parsed_input[i].winning_numbers;
        numbers_you_have = parsed_input[i].numbers_you_have;
        points += get_points_for_card(winning_numbers, numbers_you_have);
    }
    return points;
}

module.exports = { parse_input, get_points_for_card, run };