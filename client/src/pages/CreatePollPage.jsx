import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CreatePoll from '../components/CreatePoll';
import ErrorMessage from '../components/ErrorMessage';

const CreatePollPage = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div>
      <ErrorMessage />
      <CreatePoll />
    </div>
  );
};

export default CreatePollPage;
