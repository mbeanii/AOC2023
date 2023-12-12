console.time("Day 12 Execution Time")
const fs = require('fs');

class Day12{
    constructor(filepath){
        if (filepath){
            this.raw_input = fs.readFileSync(filepath, 'utf8');
        }
        else{
            this.raw_input = 
`???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`
        }
        let parsed_input = this.parse_input();
        this.rows = parsed_input.rows;
        this.values = parsed_input.values;
        this.row_index = 0;
        this.arrangement_accumulator_array = [];
    }

    parse_input(){
        let raw_rows = this.raw_input.split("\n");
        const result = new Object();
        result.rows = [];
        result.values = [];
        for (let i = 0; i < raw_rows.length; i++){
            raw_rows[i] = raw_rows[i].split(" ");
            result.rows.push(raw_rows[i][0]);
            result.values.push(raw_rows[i][1].split(",").map(x => parseInt(x)));
        }
        return result;
    }

    recursively_determine_arrangements(row, values){
        values = values.slice();
        if (values.length == 0){
            return;
        }
        for (let i = 0; i < values.length; i++){
            let all_springs = true;
            let count = 0;
            for (let j = 0; j < values[i]; j++){
                if (row[j] != '?' && row[j] != '#'){
                    all_springs = false;
                    count = j;
                    break;
                }
            }
            if (all_springs){
                let col_index = this.values[this.row_index].length - values.length;
                this.arrangement_accumulator_array[this.row_index][col_index] += 1;
                values.shift();
                this.recursively_determine_arrangements(row.slice(i+1), values);
            }
            else{
                this.recursively_determine_arrangements(row.slice(count+1), values);
            }
        }
    }

    productSum(two_d_array){
        return two_d_array.reduce((acc, cur) => acc + cur.reduce((acc, cur) => acc * cur, 1), 0)
    }

    run(){
        for (let i = 0; i < this.rows.length; i++){
            this.row_index = i;
            this.arrangement_accumulator_array.push([]);
            for(let j = 0; j < this.values[i].length; j++){
                this.arrangement_accumulator_array[i].push(0);
            }
            this.recursively_determine_arrangements(this.rows[i], this.values[i]);
        }
        return self.productSum(this.arrangement_accumulator_array);
    }
}

if (require.main === module) {
    const live_day12 = new Day12('DAY12/input.txt');
    console.log(live_day12.run());
}

module.exports = {Day12};

console.timeEnd("Day 12 Execution Time");
