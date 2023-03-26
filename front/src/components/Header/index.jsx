import React, { useState } from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

import { Link } from 'react-router-dom';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { MessagePopup } from '../MessagePopup';
// import { addMessage, removeItem } from '../../redux/slices/message';

export const Header = () => {
  const dispatch = useDispatch();
  const [lever, setLever] = useState(false);

  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
    }
  };

  const sendMessage = () => {
    setLever(true);
  };

  return (
    <div className={styles.root}>
      {/* {lever ? (
        <MessagePopup
          message="1111"
          state="alert"
        />
      ) : (
        ''
      )} */}
      <Container maxWidth="lg">
        {/* <button onClick={sendMessage}>ffsfs</button> */}
        <div className={styles.inner}>
          <Link
            className={styles.logo}
            to="/"
          >
            <div>Ekzis Blog</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
