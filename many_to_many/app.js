const port = 3000;
const express = require("express");
const db = require("./models/index");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Model = require("./models");
const users = Model.users;
const projects = Model.projects;
app.get("/", async (req, res) => {
  const { firstName, lastName, email, projectName } = req.body;
  const user = await users.create(
    {
      firstName: firstName,
      LastName: lastName,
      email: email,
      projects: [
        {
          pName: projectName,
        },
      ],
    },
    {
      include: [projects],
    }
  );
});

app.listen(port, () => {
  console.log(`listing at http://localhost:${port}`);
});
