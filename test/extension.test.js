const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const vscode = require('vscode'); // eslint-disable-line import/no-unresolved
// eslint-disable-next-line no-unused-vars
const extension = require('../src/extension');

suite('Extension Tests', () => {
  test('Something 1', () => {
    assert.equal(-1, [1, 2, 3].indexOf(5));
    assert.equal(-1, [1, 2, 3].indexOf(0));
  });
});
