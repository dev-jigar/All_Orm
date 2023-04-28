const Model = require("../models");

const users = Model.users;

const posts = Model.posts;
const basic_media = Model.basic_medias;
const comments = Model.comments;
const adv_media = Model.adv_medias;
const post_comment_media = Model.post_comment_media;

const feedTable = async (req, res) => {
  try {
    const {
      option,
      user_id,
      content,
      title,
      media_type,
      media_url,
      comment,
      post_id,
    } = req.body;

    if (option == "post") {
      const createPost = await posts.create({
        title: title,
        content: content,
        user_id: user_id,
      });

      if (media_type == "image") {
        const createEntry = await basic_media.create({
          media_type: media_type,
          media_url: media_url,
          user_id: user_id,
          
        });
        const forAll = await post_comment_media.create({
          action_type: option,
          action_id: createPost.id,
          attach_id: createEntry.id,
          attach_type: "Basic_Media",
        });
      }
      if (media_type == "video") {
        const createEntry = await basic_media.create({
          media_type: media_type,
          media_url: media_url,
          user_id: user_id,
         
        });
        const forAll = await post_comment_media.create({
          action_type: option,
          action_id: createPost.id,
          attach_id: createEntry.id,
          attach_type: "Basic_Media",
        });
      }
      if (media_type == "zip") {
        const createEntry = await adv_media.create({
          media_type: media_type,
          media_url: media_url,
          user_id: user_id,
         
        });
        const forAll = await post_comment_media.create({
          action_type: option,
          action_id: createPost.id,
          attach_id: createEntry.id,
          attach_type: "Adv_Media",
        });
      }
      if (media_type == "exe") {
        const createEntry = await adv_media.create({
          media_type: media_type,
          media_url: media_url,
          user_id: user_id,
        
        });
        const forAll = await post_comment_media.create({
          action_type: option,
          action_id: createPost.id,
          attach_id: createEntry.id,
          attach_type: "Adv_Media",
        });
      }
      res.json({ message: "success posted" });
    }
    if (option == "comment") {
      console.log("sdfsdfjsdfjsdfjk::::::::::::::::::::::::::::::::::::::");
      const validatePostComment = await posts.findAll({
        attributes: { exclude: ["userId"] },
        where: {
          id: post_id,
        },
      });
      console.log(validatePostComment);
      if (validatePostComment) {
        const createPost = await comments.create({
          post_id: post_id,
          comment: comment,
          user_id: user_id,
        });

        if (media_type == "image") {
          const createEntry = await basic_media.create({
            media_type: media_type,
            media_url: media_url,
            user_id: user_id,
      
          });
          const forAll = await post_comment_media.create({
            action_type: option,
            action_id: createPost.id,
            attach_id: createEntry.id,
            attach_type: "Basic_Media",
          });
        }
        if (media_type == "video") {
          const createEntry = await basic_media.create({
            media_type: media_type,
            media_url: media_url,
            user_id: user_id,
          
          });
          const forAll = await post_comment_media.create({
            action_type: option,
            action_id: createPost.id,
            attach_id: createEntry.id,
            attach_type: "Basic_Media",
          });
        }
        if (media_type == "zip") {
          const createEntry = await adv_media.create({
            media_type: media_type,
            media_url: media_url,
            user_id: user_id,
            
          });
          const forAll = await post_comment_media.create({
            action_type: option,
            action_id: createPost.id,
            attach_id: createEntry.id,
            attach_type: "Adv_Media",
          });
        }
        if (media_type == "exe") {
          const createEntry = await adv_media.create({
            media_type: media_type,
            media_url: media_url,
            user_id: user_id,
          
          });
          const forAll = await post_comment_media.create({
            action_type: option,
            action_id: createPost.id,
            attach_id: createEntry.id,
            attach_type: "Adv_Media",
          });
        }
        res.json({ message: "success commented" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//user to see its attachments
const fetchData = async (req, res) => {
  try {
    let data = await posts.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
      include: [
        {
          model: users,
          attributes: ["name", "email"],
          include: [
            {
              model: basic_media,
              attributes: ["media_type", "media_url"],
            },
            {
              model: adv_media,
              attributes: ["media_type", "media_url"],
            },
          ],
        },
        {
          model: comments,
          attributes: ["comment", "user_id"],
        },
      ],
    });

    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  feedTable,
  fetchData,
};
