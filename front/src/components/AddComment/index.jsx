import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import axios from '../../axios';
import { useSelector } from 'react-redux';

export const Index = (params) => {
  const [text, setText] = React.useState('');
  const userData = useSelector((state) => state.auth.data);

  const onSubmit = async () => {
    try {
      await axios.post('/comments', { text, postId: params.id });
      await params.setUpdater(params.updater + 1);
      console.log(params.updater);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при создании комантария');
    }
  };

  const changeHandle = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={
            (userData?.avatarUrl &&
              `${process.env.REACT_APP_API_URL || 'http://localhost:80'}${userData?.avatarUrl}`) ||
            '/noavatar.png'
          }
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            onChange={changeHandle}
            multiline
            fullWidth
          />
          <Button
            onClick={onSubmit}
            variant="contained"
          >
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
