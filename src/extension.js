const vscode = require('vscode'); // eslint-disable-line import/no-unresolved
const df = require('./default-format');

function activate(context) {
  const disposable = vscode.commands.registerCommand('dependency-formatter.formatDependencies', () => {
    try {
      const txt = vscode.window.activeTextEditor.document.getText();
      const totalLines = vscode.window.activeTextEditor.document.lineCount;
      vscode.window.activeTextEditor
        .edit((editBuilder) => {
          const docStart = new vscode.Position(0, 0);
          const docEnd = new vscode.Position(totalLines + 1, 0);
          const fullDocRange = new vscode.Range(docStart, docEnd);
          editBuilder.replace(fullDocRange, df.defaultFormat(txt));
        });
    } catch (e) {
      vscode.window.showErrorMessage('Error');
    }
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;
