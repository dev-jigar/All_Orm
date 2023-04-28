const { Op, where } = require("sequelize");
const Model = require("../models");
  const user = Model.user;
  const course = Model.course;
  const user_course = Model.user_course;
  const image = Model.image;
  const vedio = Model.vedio;
  const comment = Model.comment;

//filer using scope and muliple scope added

user.addScope("checkGender", {
  where: {
    gender: {
      [Op.in]: ["Male"],
    },
  },
});

user.addScope("checkContact", {
  attributes: ["firstName"],
  include: {
    model: user_course,
    where: {
      userId: { [Op.ne]: null },
    },
  },
});

const getScopeValue = async (req, res) => {
  try {
    let data = await user.scope(["checkContact", "checkGender"]).findAll({});
    res.status(200).json({ message: data });
  } catch (error) {
    console.log(error);
  }
};

//handle add and update of relationship IN MANY TO MANY

const HandleMnyRelationShip = async (req, res) => {
  //add user by relationship

  try {
    const { email, firstName, whichCourse } = req.body;

    let MainData = await user.findAll({
      where: {
        email: email,
      },
    });

    if (MainData.length === 0) {
      let data = await user.create({
        firstName: firstName,
        email: email,
      });

      if (data) {
        let some = await course.findByPk(whichCourse);
        if (some && some.dataValues.id) {
          let insJunc = await user_course.create({
            courseId: some.dataValues.id,
            userId: data.dataValues.id,
          });
          let response;
          response = {
            data: insJunc,
            success: "Done",
          };
          res.status(200).json(response);
        }
      }
    } else {
      let sdata = await user.update(
        { firstName: firstName, email: email },
        {
          where: {
            id: MainData[0].dataValues.id,
          },
        }
      );

      if (sdata) {
        let some = await course.findByPk(whichCourse);

        if (some && some.dataValues.id) {
          let checkExists = await user_course.findOne({
            where: {
              courseId: whichCourse,
              userId: MainData[0].dataValues.id,
            },
          });

          if (checkExists) {
            res.status(200).json("Relation Already Exists");
          } else {
            let insJunc = await user_course.create({
              courseId: some.dataValues.id,
              userId: MainData[0].dataValues.id,
            });
            let response;
            response = {
              data: insJunc,
              success: "Done",
            };
            res.status(200).json(response);
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//search for many Relationships

const addUserMtd = async (req, res) => {
  try {
    const data = await user_course.findAll({
      attributes: ["id", "courseId", "userId"],

      include: [
        {
          model: user,
          attributes: ["firstName", "id"],
          where: {
            firstName: "Stacey",
          },
        },
        {
          model: course,
          attributes: ["courseName"],
        },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

//polymorphic using one to many relationship
const addContext = async (req, res) => {
  try {
    let imageData = await image.create({
      title: "first Image",
      url: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    });
    let vedioData = await vedio.create({
      title: "first comment",
      text: "vedio is great !",
    });
    if (imageData.id && imageData) {
      await comment.create({
        comment: "first comment on image",
        commentTableId: imageData.id,
        commentTableType: "image",
      });

      res.status(200).json({ message: "success" });
    }
    if (vedioData.id && vedioData) {
      await comment.create({
        comment: "second comment on video",
        commentTableId: vedioData.id,
        commentTableType: "vedio",
      });
      res.status(200).json({ message: vedioData });
    }
  } catch (error) {
    console.log(error);
  }
};

const showAllrecordsPoly = async (req, res) => {
  try {
    const { type } = req.body;

    if (type == "vedio") {
      let ins = await vedio.findAll({
        include: {
          model: comment,
          attributes: ["comment",'user_id'],
          include:{
            model: user,
            attributes: ["firstName"]
          }
        },
      });
      res.status(200).json({ message: ins });
    }
    if (type == "image") {
      let ins = await image.findAll({
        attributes:['title',"url"],
        include: {
          model: comment,
          attributes: ["comment",]
        },
        
      });
      res.status(200).json({ message: ins });
    }

    // const data=await comment.findAll({
    //   include:[vedio]
    // })

    // return res.status(200).json({ message: data });
  } catch (error) {
    console.log(error);
  }
};

//Hooks

module.exports = {
  addUserMtd,
  addContext,
  HandleMnyRelationShip,
  showAllrecordsPoly,
  getScopeValue,
};
