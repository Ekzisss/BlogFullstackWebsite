import PostModel from '../Models/Post.js';

export const getLastTegs = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts.map((obj) => obj.tags).flat();
    const tagsUniqe = [...new Set(Array.from(tags))].slice(0, 5);

    res.json(tagsUniqe);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить список постов',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить список постов',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: {
          viewsCount: 1,
        },
      },
      {
        returnDocument: 'after',
      }
    )
      .populate('user')
      .then((post) => {
        if (!post) {
          return res.status(404).json({
            message: 'Пост не найден',
          });
        }
        res.json(post);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({
          message: 'Пост не найден',
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить пост',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать пост',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndDelete({
      _id: postId,
    }).then((post) => {
      if (!post) {
        return res.status(404).json({
          message: 'Пост не найден',
        });
      }

      res.json({
        secsess: true,
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: 'Пост не найден',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $set: {
          title: req.body.title,
          text: req.body.text,
          imageUrl: req.body.imageUrl,
          tags: req.body.tags,
          user: req.userId,
        },
      },
      {
        returnDocument: 'after',
      }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось обновить пост',
    });
  }
};
