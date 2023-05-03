const port = 3005;
const express = require("express");
const db = require("./models/index");
const app = express();
const userRoute = require("./routers/userRoute");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
app.use("/api", userRoute)






app.listen(port, () => {
  console.log(`listing at http://localhost:${port}`);
});
