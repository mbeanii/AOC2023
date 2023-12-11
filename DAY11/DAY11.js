console.time("Day 11 Execution Time")
    const fs = require('fs');

    class Day11{
        constructor(filepath){
            if (filepath){
                this.raw_input = fs.readFileSync(filepath, 'utf8');
            }
            else{
                this.raw_input = 
    `PASTE_HERE`
            }
            this.hands = this.parse_input();
        }

        parse_input(){
            return "Not Implemented";
        }

        run(){
            return "Not Implemented";
        }
    }

    if (require.main === module) {
        const live_day11 = new Day11('DAY11/input.txt');
        console.log(live_day11.run());
    }

    module.exports = {Hand, Day11};

    console.timeEnd('ExecutionTime');
    