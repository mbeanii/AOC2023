console.time("Day 12 Execution Time")
    const fs = require('fs');

    class Day12{
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
        const live_day12 = new Day12('DAY12/input.txt');
        console.log(live_day12.run());
    }

    module.exports = {Hand, Day12};

    console.timeEnd('ExecutionTime');
    