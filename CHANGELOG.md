# Change Log

## [0.5.0] - 2017.12.25
### Added
- `excludePatterns` option in plugin settings. Array of RegEx for excluding modules from formatting witch matching with at least one of pattern in array.
### Updated
- Dependencies of plugin

## [0.4.0] - 2017.09.28
### Fixed
- Refactor code
- Mistakes in formatting numbers
### Added
- `X`-range support
- `X`-range symbol

## [0.3.1] - 2017.08.07
## Fixed
- package-lock.json

## [0.3.0] - 2017.08.07
### Added
- Property `dependency-formatter.lastPart`. Property is used to set last valuable part of version. `major`, `minor` or `patch`. `minor` by default.
- Property `dependency-formatter.preferredRange`. Property is used to set version range symbol. `tilde` or `caret`. `tilde` by default.

## [0.2.0] - 2017.08.03
### Added
- Property `dependency-formatter.autosave`. `True` by default. If `true`, file will be saved after changes. 
### Fixed
- File won't be dirty if there was no changes.

## [0.1.1] - 2017.08.01
### Added
- Formatting any dependency version to `~x.y` format
