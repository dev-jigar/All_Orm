const port = 3000;
const express = require("express");
const db = require("./models/index");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Model = require("./models");
const users = Model.users;
const projects = Model.projects;
const user_projects = Model.user_projects;
app.get("/", async (req, res) => {
  const { firstName, lastName, email, projectName } = req.body;
  const ifExists = await users.findOne({
    where: {
      email: email,
    },
  });
  if (ifExists) {
    const user = await users.create(
      {
        projects: [
          {
            pName: projectName,
          },
        ],
        user_projects: [
          {
            user_id: ifExists.id,
            project_id: projects.id,
          },
        ],
      },
      {
        include: [projects, user_projects],
      }
    );
  }
});

app.listen(port, () => {
  console.log(`listing at http://localhost:${port}`);
});
