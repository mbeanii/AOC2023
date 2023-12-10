const fs = require('fs');
const dotenv = require('dotenv').config();
const axios = require('axios');

async function synchronize(){

    // Read directories to determine the next day to set up
    const files = fs.readdirSync("./");
    max_day = 0;
    for (let i = 0; i < files.length; i++){
        let file = files[i];
        if (file.includes("DAY")){
            let day = parseInt(file.slice(3));
            if (day >= 25){
                console.log("All days set up");
                break;
            }
            if (day > max_day){
                max_day = day;
            }
        }
    }
    day = max_day + 1;

    // make a directory and a .js file in it
    fs.mkdirSync(`./DAY${day}`);
    fs.writeFileSync(`./DAY${day}/DAY${day}.js`, 
    `console.time("Day ${day} Execution Time")
    const fs = require('fs');

    class Day${day}{
        constructor(filepath){
            if (filepath){
                this.raw_input = fs.readFileSync(filepath, 'utf8');
            }
            else{
                this.raw_input = 
    \`PASTE_HERE\`
            }
            this.parsed_input = this.parse_input();
        }

        parse_input(){
            return "Not Implemented";
        }

        run(){
            return "Not Implemented";
        }
    }

    if (require.main === module) {
        const live_day${day} = new Day${day}('DAY${day}/input.txt');
        console.log(live_day${day}.run());
    }

    module.exports = {Day${day}};

    console.timeEnd('ExecutionTime');
    `);


    // Get the input from the AoC website and save it to the input.txt file
    let input_file = `./DAY${day}/input.txt`;
    let cookie = process.env.AOC_COOKIE;

    if (!cookie) {
        throw new Error('AOC_COOKIE environment variable not set');
    }

    try {
        let response = await axios.get(`https://adventofcode.com/2023/day/${day}/input`, {
            headers: {
                'Cookie': `session=${cookie}`
            }
        });
    
        if (response.status !== 200) {
            console.log(`Request failed with status code ${response.status}`);
            return;
        }
    
        fs.writeFileSync(input_file, response.data);
    } catch (error) {
        console.log('Error:', error.message);
    }

    // make a test directory with a .test.js file in it
    test_dir = `./test/DAY${day}`;
    fs.mkdirSync(test_dir);
    fs.writeFileSync(`${test_dir}/DAY${day}.test.js`,
`const { expect } = require('chai');
const {Day${day}} = require('../../DAY${day}/DAY${day}.js');

const test_day${day} = new Day${day}("");
const live_day${day} = new Day${day}("DAY${day}/input.txt");

describe('Day${day}.run', () => {
    it('should return PASTE_HERE on test data', () => {
        expect(test_day${day}.run()).to.equal(PASTE_HERE);
    });
});
`);

    // Modify the package.json file scripts.test key to point to the new test directory
    let package_json = JSON.parse(fs.readFileSync('./package.json', encoding='utf8'));
    package_json.scripts.test = `mocha ${test_dir}`;
    fs.writeFileSync('./package.json', JSON.stringify(package_json, null, 2));

    // Modify launch.json configurations.program key to point to the new .js file
    json_str = fs.readFileSync('./.vscode/launch.json', encoding='utf8');
    let lines = json_str.split('\n');
    let comments = "";
    for (let i = 0; i < lines.length; i++){
        let line = lines[i];
        if (line.includes("    // ")) {
            comments += line + '\n';
            lines.splice(i, 1);
            i--;
        }
    }
    json_str_no_comments = lines.join('\n');
    let launch_json = JSON.parse(json_str_no_comments);

    let configurations = launch_json.configurations;
    for (let i = 0; i < configurations.length; i++){
        let configuration = configurations[i];
        if (configuration.name == "Launch Program"){
            configuration.program = `\${workspaceFolder}/DAY${day}/DAY${day}.js`;
        }
    }
    launch_json_str = JSON.stringify(launch_json, null, 4);
    launch_json_str = launch_json_str.split('\n').slice(1).join('\n');
    launch_json_str = "{\n" + comments + launch_json_str;
    
    fs.writeFileSync('./.vscode/launch.json', launch_json_str);

}

synchronize();