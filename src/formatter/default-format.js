exports.defaultFormat = defaultFormat;

const regExpPatterns = {
  dependencies: /".*?dependencies"[\s]*?:[\s]*?\{([\s\S]*?)\}/gim,
  dependency: /"(.*?)"([\s]*?:[\s]*?)"(.*?)"/gim,
  version: /^(\D)?(\d*?)(?:\.(\d*?)(?:\.(\d*?))?(?:-[0-9A-Za-z.+-]*?)?)?$/,
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
    let rangeSymbol;
    switch (settings.preferredRange) {
      case 'caret': {
        rangeSymbol = '^';
        break;
      }
      case 'tilde':
      default: {
        rangeSymbol = '~';
        break;
      }
    }
    return `${rangeSymbol}${formattedVer.join('.')}`;
  };
}

function unshiftIfExist(array, ...items) {
  items.forEach((item) => {
    if (item !== undefined) {
      array.unshift(item);
    }
  });
}
