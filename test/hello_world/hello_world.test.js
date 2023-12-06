const { expect } = require('chai');
const { execSync } = require('child_process');

describe('hello_world.js', () => {
  it('should log "Hello World!" to the console', () => {
    const output = execSync('node hello_world.js').toString().trim();
    expect(output).to.equal('Hello World!');
  });

  it('should declare a variable named "number"', () => {
    const scriptContent = require('fs').readFileSync('hello_world.js', 'utf8');
    expect(scriptContent).to.include('var number = 1;');
  });
});
