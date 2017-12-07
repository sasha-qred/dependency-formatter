const vscode = require('vscode'); // eslint-disable-line import/no-unresolved

module.exports = (config =>
  ({
    autosave: config.get('autosave'),
    lastPart: config.get('lastPart'),
    preferredRange: config.get('preferredRange'),
    xRangeSymbol: config.get('xRangeSymbol'),
    excludePatterns: config.get('excludePatterns'),
  })
)(vscode.workspace.getConfiguration('dependency-formatter'));
