import Container from '@mui/material/Container';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';

import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { fetchAuth, selectIsAuth } from './redux/slices/auth';
import { MessagePopup } from './components/MessagePopup';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuth());
  }, []);

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
