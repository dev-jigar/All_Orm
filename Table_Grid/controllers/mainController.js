const { Op } = require("sequelize");
const Model = require("../models");

const users = Model.users;
const salary = Model.salaries;

const feedTable = async (req, res) => {
  try {
    let allData = await users.findAll({});

    res.render("main", allData);
  } catch (error) {}
};

const fetchData = async (req, res) => {
  const { draw ,order} = req.query;
  const search = req.query.search || null;
  const offset = req.query.start || 0;
  const limit = req.query.length || 25;
  const columns = ["id", "name", "email"];
  const ex_cls = ["salary"];

  //for sorting purposes
  var column = order[0].column;
  var dir = order[0].dir;
  var colName = req.query.columns[column].data;
  console.log(colName);
  var orderBy = [[colName, dir]];
  if (column == 4) {
    orderBy = [["salary", "salary", dir]];
  }

  const query = {
    where: {},
    include: salary,
    offset: +offset,
    limit: +limit,
    order: [orderBy],
  };

  //for searching purposes
  if (search && search.value) {
    query.where[Op.or] = columns.map((column) => ({
      [column]: { [Op.like]: `%${search.value}%` },
    }));
    query.where[Op.or] = ex_cls.map((column) => ({
      "$salary.salary$": { [Op.gt]: `${search.value}` },
    }));
  }

  //final query
  var data = await users.findAndCountAll(query);

  return res.json({
    draw: parseInt(draw),
    recordsTotal: data.count,
    recordsFiltered: data.count,
    data: data.rows,
  });
};

module.exports = { feedTable, fetchData };
