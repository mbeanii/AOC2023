console.time('ExecutionTime');
const { count } = require('console');
const fs = require('fs');

const face_map = {
    "T": 10,
    "J": 1, // Part 2
    "Q": 12,
    "K": 13,
    "A": 14
}

class Hand{
    constructor(cards, wager){
        this.cards = cards;
        this.card_values = this.getCardValues();
        this.wager = wager;
        this.type = Object();
        [this.type.name, this.type.value] = this.determineHand();
        this.sort_strength = this.calculateSortStrength();
    }

    getCardValues(){
        let card_values = [];
        for (let i = 0; i < this.cards.length; i++){
            let card = this.cards[i];
            if (card in face_map){
                card_values[i] = face_map[card];
            }
            else{
                card_values[i] = parseInt(card);
            }
        }
        return card_values;
    }

    countRepeats() {
        let counts = {};
        for (let i = 0; i < this.cards.length; i++) {
            let num = this.cards[i];
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        return counts;
    }

    determineHand(){
        let counts = this.countRepeats();


        // Part 2
        if (this.cards === "JJJJJ"){
            return ["Five of a Kind", 7]
        }
        let num_jacks = 0;
        if ('J' in counts){
            num_jacks = counts['J'];
            delete counts['J'];
        }

        let count_vals = Object.values(counts);

        // Part 2
        count_vals.sort((a, b) => b - a);
        count_vals[0] += num_jacks;

        if (count_vals.includes(5)){
            return ["Five of a Kind", 7];
        }
        else if (count_vals.includes(4)){
            return ["Four of a Kind", 6];
        }
        else if (count_vals.includes(3) && count_vals.includes(2)){
            return ["Full House", 5];
        }
        else if (count_vals.includes(3)){
            return ["Three of a Kind", 4];
        }
        else if (count_vals.includes(2) && count_vals.length == 3){
            return ["Two Pair", 3];
        }
        else if (count_vals.includes(2)){
            return ["Pair", 2];
        }
        else{
            return ["High Card", 1];
        }
    }

    calculateSortStrength(){
        const trump_value = 759375 // One greater than the highest possible total sort strength
        let sort_strength = this.type.value * trump_value;
        let length = this.card_values.length;
        for (let i = 0; i < length; i++){
            let card_sort_strength = this.card_values[i] * (15 ** (length - i - 1));
            sort_strength += card_sort_strength;
        }
        return sort_strength;   
    }
}

class Day7 {
    constructor(filepath){
        if (filepath){
            this.raw_input = fs.readFileSync(filepath, 'utf8');
        }
        else{
            this.raw_input = 
`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`
        }
        this.hands = this.parse_input();
    }

    parse_input(){
        let hands = [];
        for (let line of this.raw_input.split('\n')){
            let [cards, wager] = line.split(' ');
            wager = parseInt(wager);
            let hand = new Hand(cards, wager);
            hands.push(hand);
        }
        return hands;
    }

    run(){
        this.hands.sort((a, b) => a.sort_strength - b.sort_strength);
        let total_winnings = 0;
        for (let i = 0; i < this.hands.length; i++){
            let hand = this.hands[i];
            let hand_winnings = hand.wager * (i + 1);
            total_winnings += hand_winnings;
        }
        return total_winnings;
    }
}

if (require.main === module) {
    const live_day7 = new Day7('DAY7/input.txt');
    console.log(live_day7.run());
}

module.exports = {Hand, Day7};

console.timeEnd('ExecutionTime');