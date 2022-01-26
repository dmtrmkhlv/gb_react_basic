import styles from '../../styles/App.module.css';

export const NoChat = (props) => {
 
  return ( 
    <div className={styles.Message__wrapper}>
        <div className={styles.NoChat}>
          <p>{props.text}</p>
        </div>
    </div> 
    );
};
