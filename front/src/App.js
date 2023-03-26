import Container from '@mui/material/Container';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';

import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { fetchAuth, selectIsAuth } from './redux/slices/auth';
import { createTheme } from '@mui/material/styles';
import { MessagePopup } from './components/MessagePopup';
import { fetchPosts, fetchTags, fetchPopPosts, fetchComments } from './redux/slices/post';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuth());
    dispatch(fetchTags());
    dispatch(fetchComments(true));
  }, []);

  const theme = createTheme({
    shadows: {
      24: '0px 11px 15px -7px red,0px 24px 38px 3px red,0px 9px 46px 8px red',
    },
  });

  theme.shadows[24] = theme.shadows[0];

  return (
    <>
      {/* <MessagePopup /> */}
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          ></Route>
          <Route
            path="/tag/:tag"
            element={<Home tags={true} />}
          ></Route>
          <Route
            path="/login"
            element={<Login />}
          ></Route>
          <Route
            path="/register"
            element={<Registration />}
          ></Route>
          <Route
            path="/posts/:id"
            element={<FullPost />}
          ></Route>
          <Route
            path="/posts/:id/edit"
            element={<AddPost />}
          ></Route>
          <Route
            path="/posts/create"
            element={<AddPost />}
          ></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
