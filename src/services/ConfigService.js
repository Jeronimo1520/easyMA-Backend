const IConfig = require("./AdapterConfig");
const config = require("config");

class ConfigService extends IConfig {
  get(name) {
    return config.get(name);
  }
}

module.exports = ConfigService