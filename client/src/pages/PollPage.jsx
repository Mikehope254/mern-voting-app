import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCurrentPoll } from '../store/actions';

import Poll from '../components/Poll';
import ErrorMessage from '../components/ErrorMessage';

const PollPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentPoll(id));
  }, [dispatch, id]);

  return (
    <div>
      <ErrorMessage />
      <Poll />
    </div>
  );
};

export default PollPage;
