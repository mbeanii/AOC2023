console.time("Day 10 Execution Time")
const { create } = require('domain');
const fs = require('fs');

// coordinates are [x, -y]
const UP    = [0, -1];
const DOWN  = [0,  1];
const LEFT  = [-1, 0];
const RIGHT = [1,  0];

class Node{
    constructor(x, y, value){
        this.x = x;
        this.y = y;
        this.value = value;
        this.next = null;
        this.prev = null;
        this.delta = [0, 0];
    }
}

class Day10{
    constructor(filepath){
        if (filepath){
            this.raw_input = fs.readFileSync(filepath, 'utf8');
        }
        else{
            this.raw_input = 
`-L|F7
7S-7|
L|7||
-L-J|
L|-JF`
        }

        this.pipe_map = this.set_pipe_map();
        this.two_d_arr = this.parse_input();
        
        this.starting_node = this.find_start();
        this.current_node = this.starting_node;
        this.starting_node.next = this.find_second();
    }

    create_node(xy){
        return new Node(xy[0], xy[1], this.two_d_arr[xy[1]][xy[0]]);
    }


    set_pipe_map(){
        let pipe_map = new Map();
        pipe_map.set('|', [UP, DOWN]);
        pipe_map.set('-', [LEFT, RIGHT]);
        pipe_map.set('L', [UP, RIGHT]);
        pipe_map.set('J', [UP, LEFT]);
        pipe_map.set('7', [LEFT, DOWN]);
        pipe_map.set('F', [RIGHT, DOWN]);
        return pipe_map;
    }

    parse_input(){
        let arr = this.raw_input.split('\n');
        let two_d_arr = arr.map((row) => {
            return row.split('');
        });
        return two_d_arr;
    }

    find_start() {
        let start = [];
        this.two_d_arr.some((row, row_index) => {
            return row.some((char, col_index) => {
                if (char === 'S') {
                    start = [row_index, col_index];
                    return true;
                }
                return false;
            });
        });
        return this.create_node(start);
    }

    up() {
        let direction = new Object();
        direction.address = [this.current_node.x, this.current_node.y - 1]
        direction.value = this.two_d_arr[direction.address[1]][direction.address[0]];
        return direction;
    }

    down() {
        let direction = new Object();
        direction.address = [this.current_node.x, this.current_node.y + 1]
        direction.value = this.two_d_arr[direction.address[1]][direction.address[0]];
        return direction;
    }

    left() {
        let direction = new Object();
        direction.address = [this.current_node.x - 1, this.current_node.y]
        direction.value = this.two_d_arr[direction.address[1]][direction.address[0]];
        return direction;
    }

    right() {
        let direction = new Object();
        direction.address = [this.current_node.x + 1, this.current_node.y]
        direction.value = this.two_d_arr[direction.address[1]][direction.address[0]];
        return direction;
    }

    containsArray(outerArray, targetArray) {
        return outerArray.some(candidate => 
            candidate.length === targetArray.length && 
            candidate.every((value, index) => value === targetArray[index])
        );
    }

    find_second() {
        let directions_and_targets = [[this.up(), DOWN],
                                    [this.down(), UP],
                                    [this.left(), RIGHT],
                                    [this.right(), LEFT]];

        let [direction, target] = [null, null];
        for (let i = 0; i < directions_and_targets.length; i++){
            [direction, target] = directions_and_targets[i];
            if (this.containsArray(this.pipe_map.get(direction.value), target)){
                return this.create_node(direction.address);
            }
        }
        throw new Error("No second pipe found");
    }

    find_next() {
        let options = this.pipe_map.get(this.current_node.value);
        options = options.filter(item => JSON.stringify(item) !== JSON.stringify(this.current_node.delta));
        return this.create_node([this.current_node.x + options[0][0], this.current_node.y + options[0][1]]);
    }

    step(){
        let next = this.current_node.next;
        let prev = this.current_node;
        let delta = [prev.x - next.x, prev.y - next.y];
        this.current_node = next;
        this.current_node.value = this.two_d_arr[this.current_node.y][this.current_node.x];
        this.current_node.prev = prev;
        this.current_node.delta = delta;
        this.current_node.next = this.find_next();
    }

    run(){
        let count_steps = 1;
        while (this.current_node.next.value != "S"){
            this.step();
            count_steps++;
        }
        return count_steps / 2;
    }
}

if (require.main === module) {
    const live_day10 = new Day10('DAY10/input.txt');
    console.log(live_day10.run());
}

module.exports = {Day10};

console.timeEnd("Day 10 Execution Time");
