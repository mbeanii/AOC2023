console.time("Day 8 Execution Time")
    const fs = require('fs');

    class Day8{
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
        const live_day8 = new Day8('DAY8/input.txt');
        console.log(live_day8.run());
    }

    module.exports = {Hand, Day8};

    console.timeEnd('ExecutionTime');
    