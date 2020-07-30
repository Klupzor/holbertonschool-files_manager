"use strict";

var _redis = _interopRequireDefault(require("./utils/redis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  console.log(_redis.default.isAlive());
  console.log(await _redis.default.get('myKey'));
  await _redis.default.set('myKey', 12, 5);
  console.log(await _redis.default.get('myKey'));
  setTimeout(async () => {
    console.log(await _redis.default.get('myKey'));
  }, 1000 * 10);
})();
