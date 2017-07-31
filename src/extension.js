const vscode = require('vscode');
const df = require('./default-format');

function activate(context) {

  const disposable = vscode.commands.registerCommand('dependency-formatter.formatDependencies', function () {
    try {
      let txt = vscode.window.activeTextEditor.document.getText();
      const totalLines = vscode.window.activeTextEditor.document.lineCount;
      vscode.window.activeTextEditor
        .edit(editBuilder => {
          const documentRange = new vscode.Range(new vscode.Position(0, 0), new vscode.Position(totalLines + 1, 0));
          editBuilder.replace(documentRange, df.defaultFormat(txt));
        });
    }
    catch (e) {
      console.error(e);
      vscode.window.showErrorMessage('Error');
    }
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;
