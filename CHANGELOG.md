# Change Log

## [Unreleased]
- Property `dependency-formatter.lastPart`. Property is used to set last valuable part of version. `major`, `minor` or `patch`. `minor` by default.

## [0.2.0] - 2017.08.03
### Added
- Property `dependency-formatter.autosave`. `True` by default. If `true`, file will be saved after changes. 
### Fixed
- File won't be dirty if there was no changes.

## [0.1.1] - 2017.08.01
### Added
- Formatting any dependency version to `~x.y` format
