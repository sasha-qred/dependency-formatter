const inherit = require('../helpers/inherit');

module.exports = JsonParseError;

function JsonParseError() {
  Error.captureStackTrace(this, JsonParseError);
}

inherit(JsonParseError, Error);
JsonParseError.prototype.name = 'JsonParseError';
JsonParseError.prototype.message = 'Parse error. Probably file is not correct JSON.';
