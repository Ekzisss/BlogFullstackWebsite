import ComentsModel from '../Models/Comments.js';
import PostModel from '../Models/Post.js';

export const getLatest = async (req, res) => {
  try {
    const coments = await ComentsModel.find().sort('-createdAt').limit(3).populate('user').exec();

    // const tags = posts.map((obj) => obj.tags).flat();
    // const tagsUniqe = [...new Set(Array.from(tags))].slice(0, 5);

    res.json(coments);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить список постов',
    });
  }
};

export const getToPost = async (req, res) => {
  try {
    const coments = await ComentsModel.find({ post: req.params.id }).populate('user').exec();

    res.json(coments);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить список постов',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new ComentsModel({
      text: req.body.text,
      post: req.body.postId,
      user: req.userId,
    });

    const coment = await doc.save();

    PostModel.findOneAndUpdate(
      {
        _id: req.body.postId,
      },
      {
        $inc: {
          commentsCount: 1,
        },
      },
      {
        returnDocument: 'after',
      }
    ).catch((err) => {
      console.log(err);
      res.status(404).json({
        message: 'Пост не найден',
      });
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать коментарий',
    });
  }
};
