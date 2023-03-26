import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts, fetchTags, fetchPopPosts, fetchComments } from '../redux/slices/post';

export const Home = (params) => {
  const { tag } = useParams();

  const [isPopPosts, setIsPopPosts] = React.useState(0);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags, postsPop, comments } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts(tag));
    dispatch(fetchPopPosts(tag));
    dispatch(fetchTags());
    dispatch(fetchComments(true));
  }, [tag]);

  const handleChange = (event, newValue) => {
    setIsPopPosts(newValue);
  };

  console.log(posts);

  return (
    <div key={tag}>
      <Tabs
        style={{ marginBottom: 15 }}
        value={isPopPosts}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid
        container
        spacing={4}
      >
        <Grid
          xs={8}
          item
          hidden={isPopPosts}
        >
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post
                key={index}
                isLoading={true}
              />
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl && `${process.env.REACT_APP_API_URL || 'http://localhost:80'}${obj.imageUrl}`
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.commentsCount}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>

        <Grid
          xs={8}
          item
          hidden={!isPopPosts}
        >
          {(isPostsLoading ? [...Array(5)] : postsPop.items).map((obj, index) =>
            isPostsLoading ? (
              <Post
                key={index}
                isLoading={true}
              />
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl && `${process.env.REACT_APP_API_URL || 'http://localhost:80'}${obj.imageUrl}`
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.commentsCount}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid
          xs={4}
          item
        >
          <TagsBlock
            items={tags.items}
            isLoading={isTagsLoading}
          />

          <CommentsBlock
            items={comments.items}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </div>
  );
};
