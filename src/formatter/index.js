const vscode = require('vscode'); // eslint-disable-line import/no-unresolved
const formatterSettings = require('../settings');
const errors = require('../errors');
const df = require('./default-format');

module.exports = formatJson;

function formatJson() {
  try {
    const activeEditor = vscode.window.activeTextEditor;
    activeEditor.edit((editBuilder) => {
      const docText = activeEditor.document.getText();
      const updatedDocText = df.defaultFormat(docText, formatterSettings);
      if (updatedDocText !== docText) {
        editBuilder.replace(getFullDocRange(activeEditor), updatedDocText);
      }
    }).then(() => {
      if (formatterSettings.autosave) {
        activeEditor.document.save();
      }
    });
  } catch (e) {
    switch (e.constructor) {
      case errors.JsonParseError: {
        vscode.window.showErrorMessage(e.message);
        break;
      }
      default: {
        vscode.window.showErrorMessage('Error');
        break;
      }
    }
  }
}

function getFullDocRange(editor) {
  return new vscode.Range(0, 0, editor.document.lineCount + 1, 0);
}
