import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchRegister } from '../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';

export const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputFileRef = React.useRef(null);
  const [imageUrl, setImageUrl] = React.useState('');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    console.log({ ...values, imageUrl });
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Не удалось зарегестрироватся!');
    }

    navigate('/login');
  };

  const handleChangeFile = async (event) => {
    try {
      console.log(event.target.files[0]);
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('Ощибка при загрузке файла');
    }
  };

  return (
    <Paper
      elevation={0}
      classes={{ root: styles.root }}
    >
      <Typography
        classes={{ root: styles.title }}
        variant="h5"
      >
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar
          style={{ cursor: 'pointer' }}
          onClick={() => inputFileRef.current.click()}
          src={
            (imageUrl && `${process.env.REACT_APP_API_URL || 'http://localhost:80'}${imageUrl}`) ||
            '/noavatar.png'
          }
          sx={{ width: 100, height: 100 }}
        />
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите имя' })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Укажите почту' })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: 'Укажите пароль' })}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button
          disabled={!isValid}
          onSubmit={onSubmit}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
