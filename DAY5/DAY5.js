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
        this.maps = parsed_input.maps;
    }

    parse_input(){
        let parsed_input = {seeds: [], maps: []};
        let lines = this.raw_input.split('\n');
        let seed_to_soil_map = new Map();
        let soil_to_fertilizer_map = new Map();
        let fertilizer_to_water_map = new Map();
        let water_to_light_map = new Map();
        let light_to_temperature_map = new Map();
        let temperature_to_humidity_map = new Map();
        let humidity_to_location_map = new Map();
        let current_map = null;

        for (let i = 0; i < lines.length; i++){
            let line = lines[i];
            if (line.includes('seeds:')){
                let seeds = line.split(': ')[1];
                seeds = seeds.split(' ');
                for (let j = 0; j < seeds.length; j++){
                    parsed_input.seeds.push(parseInt(seeds[j]));
                }
            }
            else if (line.includes('seed-to-soil map:')){
                current_map = seed_to_soil_map;
            }
            else if (line.includes('soil-to-fertilizer map:')){
                current_map = soil_to_fertilizer_map;
            }
            else if (line.includes('fertilizer-to-water map:')){
                current_map = fertilizer_to_water_map;
            }
            else if (line.includes('water-to-light map:')){
                current_map = water_to_light_map;
            }
            else if (line.includes('light-to-temperature map:')){
                current_map = light_to_temperature_map;
            }
            else if (line.includes('temperature-to-humidity map:')){
                current_map = temperature_to_humidity_map;
            }
            else if (line.includes('humidity-to-location map:')){
                current_map = humidity_to_location_map;
            }
            else if (line.length > 0){
                let map_line = line.trim().split(' ');
                let dest_start = parseInt(map_line[0]);
                let source_start = parseInt(map_line[1]);
                let length = parseInt(map_line[2]);
                for (let j = 0; j < length; j++){
                    current_map.set(source_start + j, dest_start + j);
                }
            }
        }
        parsed_input.maps.push(seed_to_soil_map);
        parsed_input.maps.push(soil_to_fertilizer_map);
        parsed_input.maps.push(fertilizer_to_water_map);
        parsed_input.maps.push(water_to_light_map);
        parsed_input.maps.push(light_to_temperature_map);
        parsed_input.maps.push(temperature_to_humidity_map);
        parsed_input.maps.push(humidity_to_location_map);
        return parsed_input;
    }
    
    run() {
        return 13;
    }
};


module.exports = {Day5};