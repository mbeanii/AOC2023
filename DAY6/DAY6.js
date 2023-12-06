console.time('ExecutionTime');
const fs = require('fs');

class Day6 {
    constructor(filepath){
        if (filepath){
            this.raw_input = fs.readFileSync(filepath, 'utf8');
        }
        else{
            this.raw_input = `Time:      7  15   30
            Distance:  9  40  200`
        }
        this.time_distance_arr = this.parse_input();
    }

    get_parabolic_equations(ms){
        // parabola: y = a(x-h)^2 + k
        // standard form: y = ax^2 + bx + c
        
        // standard form for ours is:
        // y = -x^2 + ms*x

        // complete the square:
        // y = -(x^2 - ms*x + ms^2/4) + ms^2/4
        // y = -(x - ms/2)^2 + ms^2/4
        // x = -1(y - ms^2/4)^2 + ms/2

        // Therefore h = ms/2 and k = ms^2/4

        const h = (ms / 2);
        const k = ((ms ** 2) / 4)
        const a = -1

        function yequals(x){
            return ((a * ((x - h) ** 2)) + k);
            // -1(0 - 7.5)^2 + (15^2)/4
            // -56.25 + 56.25 = 0
        }

        function xequals(y){
            let sol1 = (h - ((y-k)/a) ** (0.5));
            let sol2 = (h + ((y-k)/a) ** (0.5));
            return [sol1, sol2];
        }

        return {yequals, xequals};
    }

    parse_input(){
        let lines = this.raw_input.split('\n');
        let line = lines[0];
        let times = line.trim().split(/\s+/);
        times.shift();

        // part 2
        let time = "";
        for (let i = 0; i < times.length; i++){
            time += times[i];
        }
        times = [parseInt(time)]; 

        line = lines[1];
        let distances = line.trim().split(/\s+/);
        distances.shift();

        // part 2
        let distance = "";
        for (let i = 0; i < distances.length; i++){
            distance += distances[i];
        }
        distances = [parseInt(distance)]; 

        const zipped = times.map((element, index) => [element, distances[index]]);
        return zipped;
    }

    run(){
        let ways_to_win = []
        for (let i = 0; i < this.time_distance_arr.length; i++){
            let [time, distance] = this.time_distance_arr[i];
            const equations = this.get_parabolic_equations(time);
            let tie_nums = equations.xequals(distance);
            tie_nums[0] = Math.floor(tie_nums[0]) + 1;
            tie_nums[1] = Math.ceil(tie_nums[1] - 1);
            ways_to_win.push(tie_nums[1] - tie_nums[0] + 1)
        }
        return ways_to_win.reduce((a, b) => a * b);
    }
}


if (require.main === module) {
    const live_day6 = new Day6('DAY6/input.txt');
    console.log(live_day6.run());
}

module.exports = {Day6};

console.timeEnd('ExecutionTime');