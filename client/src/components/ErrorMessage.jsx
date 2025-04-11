import React from 'react';
import { useSelector } from 'react-redux';

const ErrorMessage = () => {
  const error = useSelector(state => state.error);

  return error.message ? (
    <div className="error">{error.message.message}</div>
  ) : null;
};

export default ErrorMessage;
