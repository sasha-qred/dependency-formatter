const vscode = require('vscode'); // eslint-disable-line import/no-unresolved

module.exports = (config =>
  ({
    autosave: config.get('autosave'),
    lastPart: config.get('lastPart'),
    preferredRange: config.get('preferredRange'),
  })
)(vscode.workspace.getConfiguration('dependency-formatter'));
