const express = require("express");
const UserRoute = require("./routes/UserRoutes")
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended:true}))
app.use('/api',UserRoute)

app.listen(port, () => {
  console.log(`listing at http://localhost:${port}`);
});
