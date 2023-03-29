import React from 'react';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import ReactMarkdown from 'react-markdown';

import { useParams } from 'react-router-dom';
import axios from '../axios';
import { useDispatch } from 'react-redux';

import { addMessage } from '../redux/slices/message';

export const FullPost = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState();
  const [comments, setCommnets] = React.useState();
  const [isPostLoading, setPostLoading] = React.useState(true);
  const [isCommentsLoading, setCommentsLoading] = React.useState(true);
  const [updater, setUpdater] = React.useState(0);
  const { id } = useParams();

  console.log('top ' + updater);

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setPostLoading(false);
      })
      .catch((err) => {
        console.warn(err);

        dispatch(
          addMessage({
            message: 'Ошибка при получении статьи',
            state: 'alert',
          })
        );
      });

    axios
      .get(`/comments/${id}`)
      .then((res) => {
        setCommnets(res.data);
        setCommentsLoading(false);
      })
      .catch((err) => {
        console.warn(err);

        dispatch(
          addMessage({
            message: 'Ошибка при получении коментариев',
            state: 'alert',
          })
        );
      });
  }, [updater]);

  if (isPostLoading) {
    return (
      <Post
        isLoading={isPostLoading}
        isFullPost
      />
    );
  }

  return (
    <div key={updater}>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl && `${process.env.REACT_APP_API_URL || 'http://localhost:80'}${data.imageUrl}`
        }
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={comments}
        isLoading={isCommentsLoading}
      >
        <Index
          setUpdater={setUpdater}
          updater={updater}
          id={data._id}
        />
      </CommentsBlock>
    </div>
  );
};
