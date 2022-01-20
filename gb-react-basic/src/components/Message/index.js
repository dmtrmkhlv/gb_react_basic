import React from 'react';

export const Message = (props) => {
  return (
    <div
      className={props.message.author === "admin"
      ? "Message admin"
      : "Message"}>
      <p className="Message__text">{props.message.text}</p>
      <p className="Message__author">{props.message.author}</p>
    </div>
  );
};