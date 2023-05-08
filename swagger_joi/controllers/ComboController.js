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
          // option_masters: [...option_masters],
        },
        {
          where: {
            id: updateFind.dataValues.id,
          },
        }
        // {
        //   include: [{ model: option_masters }],
        // }
      );
      res.json({ data: updateData });
     
    }
    const option_masters = req.body.option_master;
    console.log(...option_masters);
    console.log("id::::::::::::",updateFind.dataValues.id)
    const upt = await option_master.update({
      option_masters: [...option_masters],
      where: {
        s_id: updateFind.dataValues.id,
      },
    });
    
    console.log("UPDATED OPTIONS", upt);
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
          id: select.id,
        },
        include: [{ model: option_master }],
      });
      console.log("get___data", getData);
    }
  } catch (error) {}
};
module.exports = {
  addCombo,
  updateCombo,
  showData,
};
