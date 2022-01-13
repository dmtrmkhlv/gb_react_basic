import React from 'react';

export const Message = (props) => {
  return (
    <div className="Message">
        <p>{props.message}</p>
    </div>
  );
};