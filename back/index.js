import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
  postUpdateValidation,
  CommentValidation,
} from './validations.js';
import { handlValidationErrors, checkAuth } from './utils/index.js';
import { UserController, PostController, CommentController, upload, uploadUrl } from './Controllers/index.js';

mongoose
  .connect(
    process.env.MONGODB_URL ||
      'mongodb://admin:admin@ac-u2mcl2l-shard-00-00.3wibnwa.mongodb.net:27017,ac-u2mcl2l-shard-00-01.3wibnwa.mongodb.net:27017,ac-u2mcl2l-shard-00-02.3wibnwa.mongodb.net:27017/blog?ssl=true&replicaSet=atlas-7vv1q5-shard-0&authSource=admin&retryWrites=true&w=majority'
  )
  .then(() => console.log('db ok'))
  .catch((err) => console.log('db error', err));

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// user

app.post('/reg', registerValidation, handlValidationErrors, UserController.register);
app.post('/login', loginValidation, handlValidationErrors, UserController.login);
app.get('/profile', checkAuth, UserController.profile);

// posts

app.get('/tags', PostController.getLastTegs);

app.get('/posts', PostController.getAll);
app.get('/posts/tag/:tag', PostController.getAll);
app.get('/posts-pop', PostController.getAllPop);
app.get('/posts-pop/:tag', PostController.getAllPop);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handlValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postUpdateValidation, handlValidationErrors, PostController.update);

// coments

app.get('/comments/latest', CommentController.getLatest);
app.get('/comments/:id', CommentController.getToPost);
app.post('/comments', checkAuth, CommentValidation, handlValidationErrors, CommentController.create);

// other

app.post('/upload', upload.single('image'), uploadUrl);

// listen

app.listen(process.env.PORT || 80, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});
