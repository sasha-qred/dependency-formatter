# Dependency formatter

Simple dependency version formatting

`Format Dependencies` - formatting any dependency version to custom format.  
Extension options:
- `dependency-formatter.autosave` - Enable or disable automatic saving.
- `dependency-formatter.lastPart` - Last valuable part of version. `major`, `minor` or `patch`.
- `dependency-formatter.preferredRange` - Set extension range. `tilde`, `caret` or `x-range`.
- `dependency-formatter.xRangeSymbol` - Set `x-range` symbol. `x`, `X` or `*`.
- `excludePatterns` option in plugin settings. Array of RegEx for excluding modules from formatting witch matching with at least one of pattern in array.
