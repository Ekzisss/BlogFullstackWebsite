import { useState, useEffect } from 'react';
import styles from './MessagePopup.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../../redux/slices/message';

export const MessagePopup = () => {
  const dispatch = useDispatch();
  const { messageList } = useSelector((state) => state.message);

  console.log(messageList.message);
  console.log(messageList.state);

  useEffect(() => {
    setTimeout(() => {
      // setStyle(styles.slide);
      dispatch(removeItem());
    }, 4000);
  }, [messageList]);

  return (
    <div className={styles.main}>
      {messageList.map((messageList) => (
        <div
          key={messageList.message}
          className={`${styles.message} ${
            messageList.state === 'alert'
              ? styles.alert
              : messageList.state === 'success'
              ? styles.success
              : ''
          }`}
        >
          <p>{messageList.message}</p>
        </div>
      ))}
      {/* <div className={styles.message}>
        <p>1111</p>
      </div>

      <div className={styles.message}>
        <p>2222</p>
      </div> */}
    </div>
  );
};

// export const MessagePopup = ({ message, state }) => {
//   console.log(message);
//   console.log(state);
//   const [style, setStyle] = useState(
//     `${styles.main} ${state === 'alert' ? styles.alert : state === 'sucsess' ? styles.sucsess : ''}`
//   );

//   useEffect(() => {
//     setTimeout(() => {
//       setStyle(style + ` ${styles.slide}`);
//     }, 4000);
//   }, []);

//   return (
//     <div className={style}>
//       <p>{message}</p>
//     </div>
//   );
// };
