import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPolls, getUserPolls, deletePoll } from '../store/actions';
import { useNavigate } from 'react-router-dom';

const Polls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { polls, auth } = useSelector(state => state);

  useEffect(() => {
    dispatch(getPolls());
  }, [dispatch]);

  const handleSelect = id => {
    navigate(`/poll/${id}`);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation(); // Prevent navigating to the poll
    if (window.confirm('Are you sure you want to delete this poll?')) {
      dispatch(deletePoll(id));
    }
  };

  return (
    <React.Fragment>
      {auth.isAuthenticated && (
        <div className="buttons_center">
          <button className="button" onClick={() => dispatch(getPolls())}>
            All polls
          </button>
          <button className="button" onClick={() => dispatch(getUserPolls())}>
            My polls
          </button>
        </div>
      )}
      <ul className="polls">
        {polls.map(poll => (
          <li key={poll._id} className="poll-item">
            <div
              onClick={() => handleSelect(poll._id)}
              className="poll-question">
              {poll.question}
            </div>
            {auth.isAuthenticated &&
              poll.user &&
              auth.user.id === poll.user._id && (
                <button
                  className="button delete-button"
                  onClick={e => handleDelete(e, poll._id)}
                  style={{
                    backgroundColor: '#e74c3c',
                    marginLeft: '10px',
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                  }}>
                  Delete
                </button>
              )}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Polls;
