import React from 'react';
import Card from '@mui/material/Card';

export const Message = (props) => {
  return (
    <Card
      variant="outlined"
      className={props.message.author === "admin"
      ? "Message admin"
      : "Message"}>
      <p className="Message__text">{props.message.text}</p>
      <p className="Message__author">{props.message.author}</p>
    </Card>
  );
};