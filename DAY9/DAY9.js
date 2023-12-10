console.time("Day 9 Execution Time")
const { all } = require('axios');
    const fs = require('fs');

    class Day9{
        constructor(filepath){
            if (filepath){
                this.raw_input = fs.readFileSync(filepath, 'utf8');
            }
            else{
                this.raw_input = 
`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`
            }
            this.input_list = this.parse_input();
        }

        parse_input(){
            let lines = this.raw_input.split('\n');
            let num_chars = lines.map(line => line.split(' ').map(num => parseInt(num)));
            return num_chars;
        }

        recursively_find_differences(line)
        {
            let all_zero = true;
            for (let i = 0; i < line.length; i++){
                if (line[i] != 0){
                    all_zero = false;
                    break;
                }
            }
            if (all_zero){            
                line.unshift(0); // Part 2
                return line;
            }
            let differences = [];
            for (let i = 0; i < line.length - 1; i++){
                differences.push(line[i + 1] - line[i]);
            }
            this.recursively_find_differences(differences);
            // Part 1
            // line.push(0);
            // line[line.length - 1] = line[line.length - 2] + differences[differences.length - 1];
            
            // Part 2
            let val = line[0] - differences[0];
            line.unshift(val)
            return line;
        }

        run(){
            let diff_sum = 0
            for (let i = 0; i < this.input_list.length; i++){
                let differences = this.recursively_find_differences(this.input_list[i]);
                // Part 1 diff_sum += differences[differences.length - 1];
                // Part 2
                diff_sum += differences[0];
            }
            return diff_sum;
        }
    }

    if (require.main === module) {
        const live_day9 = new Day9('DAY9/input.txt');
        console.log(live_day9.run());
    }

    module.exports = {Day9};

    console.timeEnd('Day 9 Execution Time');
    