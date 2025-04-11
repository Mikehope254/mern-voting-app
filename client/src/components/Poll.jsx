import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { vote, deletePoll } from '../store/actions';
import { color } from '../services/color';
import { useNavigate } from 'react-router-dom';

const Poll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const poll = useSelector(state => state.currentPoll);
  const auth = useSelector(state => state.auth);

  const isCreator =
    auth.isAuthenticated && poll.user && auth.user.id === poll.user._id;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this poll?')) {
      dispatch(deletePoll(poll._id)).then(() => {
        // Navigate back to the home page after deletion
        navigate('/');
      });
    }
  };

  let answers = null;

  if (poll && poll.options) {
    answers = poll.options.map(option => (
      <button
        onClick={() => dispatch(vote(poll._id, { answer: option.option }))}
        className="button"
        key={option._id}>
        {option.option}
      </button>
    ));
  }
  const data =
    poll && poll.options
      ? {
          labels: poll.options.map(option => option.option),
          datasets: [
            {
              label: poll.question,
              backgroundColor: poll.options.map(() => color()),
              borderColor: '#323643',
              data: poll.options.map(option => option.votes),
            },
          ],
        }
      : { labels: [], datasets: [] };

  return (
    <div>
      <h3 className="poll-title">{poll.question}</h3>

      {isCreator && (
        <div className="buttons_center" style={{ marginBottom: '1rem' }}>
          <button
            className="button"
            style={{ backgroundColor: '#e74c3c' }}
            onClick={handleDelete}>
            Delete Poll
          </button>
        </div>
      )}
      <div className="buttons_center">{answers}</div>
      <Pie data={data} />
    </div>
  );
};

export default Poll;
