const Model = require("../models");
const select_master = Model.select_master;
const option_master = Model.option_master;

const addCombo = async (req, res) => {
  try {
    const { name, controller } = req.body;
    const option_masters = req.body.option_master;
    const selectIns = await select_master.create(
      {
        name: name,
        controller: controller,
        option_masters: [...option_masters],
      },
      {
        include: [{ model: option_master }],
      }
    );
    res.json(selectIns);
  } catch (error) {
    console.log("ERROR", error);
  }
};

const updateCombo = async (req, res) => {
  try {
    const { select_id, name, controller } = req.body;

    const updateFind = await select_master.findOne({
      where: { id: select_id },
    });
    if (updateFind) {
      const updateData = await select_master.update(
        {
          name: name,
          controller: controller,
        },
        {
          where: {
            id: updateFind.dataValues.id,
          },
        }
      );
      res.json({ data: updateData });
    }

    const option_masters = req.body.option_master;
    const upt = await option_master.findAll({
      where: {
        s_id: updateFind.dataValues.id,
      },
    });

    for (let i = 0; i < upt.length; i++) {
      const uptOptions = await option_master.update(option_masters[i], {
        where: {
          id: upt[i].dataValues.id,
        },
      });
    }
    if (upt.length != option_masters.length) {
      let diff = option_masters.length - upt.length;
      for (let i = 0; i < diff; i++) {
        const addSome = await option_master.create(
          option_masters[upt.length + i],
          {
            s_id: updateFind.dataValues.id,
          }
        );
      }
    }
  } catch (error) {
    console.log("Update", error);
  }
};

const showData = async (req, res) => {
  try {
    const { select } = req.body;
    const data = await select_master.findByPk(select);

    if (select) {
      const getData = await select_master.findOne({
        where: {
          id: select,
        },
        include: [{ model: option_master }],
      });

      let cp = 0;
      let type = getData.controller;
      let AllOptions = getData.option_masters;
      let content = ``;

      res.json({ data: getData });
      if (type == "radio") {
        AllOptions.forEach((element) => {
          content += `<input type='radio' name = 'radio${cp}'/>${element.op_name}`;
        });
        cp++;
        console.log(content);
        return content;
      }

      if (type == "dropdown") {
        content += `<select id=${getData.name}>`;
        AllOptions.forEach((element) => {
          content += `
      <option value='${element.op_name}'>${element.op_name}</option>`;
        });
        content += `</select>`;
        console.log(content);
        return content;
      }
      if (type == "checkbox") {
        AllOptions.forEach((element) => {
          content += `<input type='checkbox' name = '${element.s_id}' value='${element.op_name}'/><lable>${element.op_name}</lable>`;
        });
        console.log(content);
        return content;
      }
      res.json({ data: getData });
    }
  } catch (error) {}
};

const deleteData = async (req, res) => {
  try {
  } catch (error) {
    console.log("Delete data", error);
  }
};
module.exports = {
  addCombo,
  updateCombo,
  showData,
};
