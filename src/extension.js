const vscode = require('vscode'); // eslint-disable-line import/no-unresolved
const formatter = require('./formatter');

function activate(context) {
  const disposable = vscode.commands
    .registerCommand('dependency-formatter.formatDependencies', formatter);
  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;
