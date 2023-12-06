const fs = require('fs');

class Day5 {
    constructor(filepath){
        if (filepath){
            this.raw_input = fs.readFileSync(filepath, 'utf8');
        }
        else{
            this.raw_input = `seeds: 79 14 55 13

            seed-to-soil map:
            50 98 2
            52 50 48
            
            soil-to-fertilizer map:
            0 15 37
            37 52 2
            39 0 15
            
            fertilizer-to-water map:
            49 53 8
            0 11 42
            42 0 7
            57 7 4
            
            water-to-light map:
            88 18 7
            18 25 70
            
            light-to-temperature map:
            45 77 23
            81 45 19
            68 64 13
            
            temperature-to-humidity map:
            0 69 1
            1 0 69
            
            humidity-to-location map:
            60 56 37
            56 93 4`
        }
        let parsed_input = this.parse_input();
        this.seeds = parsed_input.seeds;
        this.mapping_functions = parsed_input.mapping_functions;
    }

    build_mapping_function(map_vals){
        return function (key) {
            let value = key;
            for (let i = 0; i < map_vals.length; i++){
                let map_line = map_vals[i];
                let dest_start = map_line[0];
                let source_start = map_line[1];
                let length = map_line[2];
                if (source_start <= key && key < source_start + length){
                    value = key + dest_start - source_start;
                    break;
                }
            }
            return value;
        }
    }

    parse_input(){
        let parsed_input = {seeds: [], mapping_functions: []};
        let lines = this.raw_input.split('\n');
        let map_vals = [];

        for (let i = 0; i < lines.length; i++){
            let line = lines[i];
            if (line.includes('seeds:')){
                let seeds = line.split(': ')[1];
                seeds = seeds.split(' ');
                for (let j = 0; j < seeds.length; j++){
                    parsed_input.seeds.push(parseInt(seeds[j]));
                }
            }
            else if (line.includes('map:')){
                // Build the one before and clear the array for the next set
                if (map_vals.length > 0){
                    let mapping_function = this.build_mapping_function(map_vals)
                    parsed_input.mapping_functions.push(mapping_function);
                    map_vals = [];
                }
            }
            else if (line.length > 0){
                let map_line = line.trim().split(' ');
                let dest_start = parseInt(map_line[0]);
                let source_start = parseInt(map_line[1]);
                let length = parseInt(map_line[2]);
                map_vals.push([dest_start, source_start, length])
            }
        }
        // Build the last one
        parsed_input.mapping_functions.push(this.build_mapping_function(map_vals));
        map_vals = [];
        return parsed_input;
    }
    
    run() {
        let lowest_location = null;
        for (let i = 0; i < this.seeds.length; i++){
            let seed = this.seeds[i];
            for (let j = 0; j < this.mapping_functions.length; j++){
                seed = this.mapping_functions[j](seed);
            }
            if (!lowest_location || seed < lowest_location){
                lowest_location = seed;
            }
        }
        return lowest_location;
    }
};

const live_day5 = new Day5('DAY5/input.txt');
console.log(live_day5.run());

module.exports = {Day5};