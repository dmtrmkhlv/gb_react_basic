import React from 'react';
import Card from '@mui/material/Card';
import styles from '../../styles/App.module.css';

export const Message = (props) => {
  return (
    <Card
      variant="outlined"
      className={props.message.author === "admin"
      ? (styles.Message + " " + styles.admin)
      : styles.Message}>
      <p className={styles.Message__text}>{props.message.text}</p>
      <p className={styles.Message__author}>{props.message.author}</p>
    </Card>
  );
};