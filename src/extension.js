const vscode = require('vscode'); // eslint-disable-line import/no-unresolved
const df = require('./default-format');

const config = vscode.workspace.getConfiguration('dependency-formatter');

function activate(context) {
  const disposable = vscode.commands.registerCommand('dependency-formatter.formatDependencies', () => {
    try {
      const activeEditor = vscode.window.activeTextEditor;
      activeEditor.edit((editBuilder) => {
        const docText = activeEditor.document.getText();
        const totalLines = activeEditor.document.lineCount;
        const docStart = new vscode.Position(0, 0);
        const docEnd = new vscode.Position(totalLines + 1, 0);
        const fullDocRange = new vscode.Range(docStart, docEnd);
        const updatedDocText = df.defaultFormat(docText);
        if (updatedDocText !== docText) {
          editBuilder.replace(fullDocRange, updatedDocText);
        }
      }).then(() => {
        if (config.get('autosave')) {
          activeEditor.document.save();
        }
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
