const express = require("express");

const app = express();

// IMPORTAR ROUTER
const router = require("./src/routers");
const ConfigService = require("./src/services/ConfigService");
const config = new ConfigService();

app.use(router);
const PORT = config.get('port')
app.listen(PORT, () => {
  console.log(`Api corriendo: http://localhost:${PORT}`);
});