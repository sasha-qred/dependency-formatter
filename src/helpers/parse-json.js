const JsonParseError = require('../errors/json-parse-error');

module.exports = parseJson;

function parseJson(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    throw new JsonParseError();
  }
}
