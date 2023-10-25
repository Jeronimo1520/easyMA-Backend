const express = require("express");
const app = express()
const router = require("./src/routers")
app.use(router)

const port = 3001;
app.listen(port, () => {
  console.log(`Api corriendo en http://localhost:${port}`);
});
