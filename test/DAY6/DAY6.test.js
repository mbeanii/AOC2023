const { expect } = require('chai');
const { Day6 } = require('../../DAY6/DAY6.js');

const test_day6 = new Day6("");

describe('Day6.run', () => {
    it('should return 288 on test data', () => {
        expect(test_day6.run()).to.equal(288);
    });
});

describe('Day6.parse_input', () => {
    it('should return array matching expected values', () => {
        let expected = [[7, 9], [15, 40], [30, 200]];
        expect(test_day6.time_distance_arr).to.have.lengthOf(3);
        for (let i = 0; i < test_day6.time_distance_arr.length; i++){
            expect(test_day6.time_distance_arr[i]).to.have.lengthOf(2);
            for (let j = 0; j < test_day6.time_distance_arr[i].length; j++){
                expect(test_day6.time_distance_arr[i][j]).to.equal(expected[i][j]);
            }
        }
    });
});


describe('Day6.get_parabolic_equations', () => {
    it('yequals of 0 should return 0', () => {        
        for (let i = 0; i < test_day6.time_distance_arr.length; i++){
            let [time, distance] = test_day6.time_distance_arr[i];
            const equations = test_day6.get_parabolic_equations(time);
            let result = equations.yequals(0);
            expect(result).to.equal(0);
        }
    });
    it('xequals of 0 should return 0, 7', () => {        
        let expected = [7, 15, 30]
        for (let i = 0; i < test_day6.time_distance_arr.length; i++){
            let [time, distance] = test_day6.time_distance_arr[i];
            const equations = test_day6.get_parabolic_equations(time);
            let result = equations.xequals(0);
            expect(result[0]).to.equal(0);
            expect(result[1]).to.equal(expected[i]);
        }
    });
});

