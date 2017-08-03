(() => {
  exports.defaultFormat = defaultFormat;

  const regExpPatterns = {
    dependencies: /".*?dependencies"[\s]*?:[\s]*?\{([\s\S]*?)\}/gim,
    dependency: /"(.*?)"([\s]*?:[\s]*?)"(.*?)"/gim,
    version: /^(\D)?(\d*?)(?:\.(\d*?)(?:\.(\d*?))?(?:-[0-9A-Za-z.+-]*?)?)?$/,
  };

  function defaultFormat(textToFormat) {
    const dependenciesRegExp = new RegExp(regExpPatterns.dependencies);
    return textToFormat.replace(dependenciesRegExp, formatBlocks);
  }

  function formatBlocks(matchedString) {
    const dependencyRegExp = new RegExp(regExpPatterns.dependency);
    return matchedString.replace(dependencyRegExp, formatVersions);
  }

  function formatVersions(matchedString, dependencyName, dependencySeparator, dependencyVer) {
    const versionRegExp = regExpPatterns.version;
    const formattedDependencyVer = dependencyVer.replace(versionRegExp, replaceVersion);
    return `"${dependencyName}"${dependencySeparator}"${formattedDependencyVer}"`;
  }

  function replaceVersion(fullVersion, verRange, majorVer, minorVer) {
    return `~${majorVer}.${minorVer}`;
  }
})();
