import { useState, useEffect } from 'react';
import styles from './MessagePopup.module.scss';

export const MessagePopup = (props) => {
  console.log(props.message);
  console.log(props.state);
  const [style, setStyle] = useState(
    `${styles.main} ${
      props.state === 'alert' ? styles.alert : props.state === 'sucsess' ? styles.sucsess : ''
    }`
  );

  useEffect(() => {
    setTimeout(() => {
      // console.log('3333');
      setStyle(style + ` ${styles.slide}`);
    }, 4000);
  }, []);

  // console.log(style);

  return (
    <div className={style}>
      <p>{props.message}</p>
    </div>
  );
};
