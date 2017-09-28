const helpers = require('../helpers');

exports.defaultFormat = defaultFormat;

const regExpPatterns = {
  dependencies: /".*?dependencies"[\s]*?:[\s]*?\{([\s\S]*?)\}/gim,
  dependency: /"(.*?)"([\s]*?:[\s]*?)"(.*?)"/gim,
  version: /^([~^])?(\d*?)(?:\.(\d*?)(?:\.(\d*?))?(?:-[0-9A-Za-z.+-]*?)?)?$/,
};

function defaultFormat(textToFormat, settings) {
  const dependenciesRegExp = new RegExp(regExpPatterns.dependencies);
  return textToFormat.replace(dependenciesRegExp, formatBlocks(settings));
}

function formatBlocks(settings) {
  return (matchedString) => {
    const dependencyRegExp = new RegExp(regExpPatterns.dependency);
    return matchedString.replace(dependencyRegExp, formatVersions(settings));
  };
}

function formatVersions(settings) {
  return (matchedString, dependencyName, dependencySeparator, dependencyVer) => {
    const versionRegExp = regExpPatterns.version;
    const formattedDependencyVer = dependencyVer.replace(versionRegExp, replaceVersion(settings));
    return `"${dependencyName}"${dependencySeparator}"${formattedDependencyVer}"`;
  };
}

function replaceVersion(settings) {
  return (fullVersion, verRange, majorVer, minorVer, patchVer) => {
    let version = '';
    version = formatNumber(settings, majorVer, minorVer, patchVer);
    version = formatRange(settings, version);
    return version;
  };
}

function formatNumber(settings, majorVer, minorVer, patchVer) {
  const formattedVer = [];
  switch (settings.lastPart) {
    case 'patch': {
      unshiftIfExist(formattedVer, patchVer);
    } // falls through
    case 'minor': {
      unshiftIfExist(formattedVer, minorVer);
    } // falls through
    case 'major': {
      unshiftIfExist(formattedVer, majorVer);
      break;
    }
    default: {
      unshiftIfExist(formattedVer, minorVer, majorVer);
      break;
    }
  }
  return formattedVer.join('.');
}

function formatRange(settings, versionNumber) {
  if (!helpers.isExist(versionNumber)) {
    return `${settings.xRangeSymbol}`;
  }
  switch (settings.preferredRange) {
    case 'caret': {
      return `^${versionNumber}`;
    }
    case 'x-range': {
      if (versionNumber.split('.').length < 3) {
        return `${versionNumber}.${settings.xRangeSymbol}`;
      }
      return versionNumber;
    }
    case 'tilde':
    default: {
      return `~${versionNumber}`;
    }
  }
}

function unshiftIfExist(array, ...items) {
  items.forEach((item) => {
    if (helpers.isExist(item)) {
      array.unshift(item);
    } else {
      array.splice(0, array.length);
    }
  });
}
