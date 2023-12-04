const { expect } = require('chai');
const { execSync } = require('child_process');

describe('implementation/hello_world.js', () => {
  it('should log "Hello World!" to the console', () => {
    const output = execSync('node implementation/hello_world.js').toString().trim();
    expect(output).to.equal('Hello World!');
  });

  it('should declare a variable named "number"', () => {
    const scriptContent = require('fs').readFileSync('implementation/hello_world.js', 'utf8');
    expect(scriptContent).to.include('var number = 1;');
  });
});
