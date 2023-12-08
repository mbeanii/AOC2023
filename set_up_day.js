const fs = require('fs');
const https = require('https');
const dotenv = require('dotenv');

// Read directories to determine the next day to set up
const files = fs.readdirSync("./");
max_day = 0;
for (let i = 0; i < files.length; i++){
    let file = files[i];
    if (file.includes("DAY")){
        let day = parseInt(file.slice(3));
        if (day >= 25){
            console.log("All days set up");
            return;
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
    const live_day${day} = new Day${day}('DAY${day}/input.txt');
    console.log(live_day${day}.run());
}

module.exports = {Hand, Day${day}}};

console.timeEnd('ExecutionTime');
`);


// Get the input from the AoC website and save it to the input.txt file
let input_file = `./DAY${day}/input.txt`;
let cookie = process.env.AOC_COOKIE;

if (!cookie) {
    throw new Error('AOC_COOKIE environment variable not set');
}

let options = {
    hostname: 'adventofcode.com',
    path: `/2023/day/${day}/input`,
    headers: {
        'Cookie': cookie
    }
};

https.get(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        fs.writeFileSync(input_file, data);
    });
}).on('error', (err) => {
    console.log('Error: ' + err.message);
});

// make a test directory with a .test.js file in it
fs.mkdirSync(`./DAY${day}/test`);
fs.writeFileSync(`./DAY${day}/test/DAY${day}.test.js`,
`const { expect } = require('chai');
const {Hand, Day${day}} = require('../DAY${day}.js');

const test_day${day} = new Day${day}("");
const live_day${day} = new Day${day}("DAY${day}/input.txt");

describe('Day7.run', () => {
    it('should return PASTE_HERE on test data', () => {
        expect(test_day7.run()).to.equal(PASTE_HERE);
    });
});
`);

// Modify the package.json file scripts.test key to point to the new test directory
let package_json = JSON.parse(fs.readFileSync('./package.json'));
package_json.scripts.test = `mocha DAY${day}/test`;
fs.writeFileSync('./package.json', JSON.stringify(package_json, null, 2));

// Modify launch.json configurations.program key to point to the new .js file
let launch_json = JSON.parse(fs.readFileSync('./.vscode/launch.json'));

let configurations = launch_json.configurations;
for (let i = 0; i < configurations.length; i++){
    let configuration = configurations[i];
    if (configuration.name == "Launch Program"){
        configuration.program = `\${workspaceFolder}/DAY${day}/DAY${day}.js`;
    }
}
fs.writeFileSync('./.vscode/launch.json', JSON.stringify(launch_json, null, 2));
