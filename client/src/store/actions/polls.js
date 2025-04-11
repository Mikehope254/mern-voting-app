import API from '../../services/api';
import { SET_POLLS, SET_CURRENT_POLL } from '../actionTypes';
import { addError, removeError } from './error';

export const setPolls = polls => ({
  type: SET_POLLS,
  polls,
});

export const setCurrentPoll = poll => ({
  type: SET_CURRENT_POLL,
  poll,
});

export const getPolls = () => {
  return async dispatch => {
    try {
      const polls = await API.call('get', `polls`);
      dispatch(setPolls(polls));
      dispatch(removeError());
    } catch (err) {
      const { error } =
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : err.message || 'Something went wrong';
      dispatch(addError(error));
    }
  };
};

export const getUserPolls = () => {
  return async dispatch => {
    try {
      const polls = await API.call('get', 'polls/user');
      dispatch(setPolls(polls));
      dispatch(removeError());
    } catch (err) {
      const { error } =
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : err.message || 'Something went wrong';
      dispatch(addError(error));
    }
  };
};

export const createPoll = data => {
  return async dispatch => {
    try {
      const poll = await API.call('post', 'polls', data);
      dispatch(setCurrentPoll(poll));
      dispatch(removeError());
    } catch (err) {
      const { error } =
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : err.message || 'Something went wrong';
      dispatch(addError(error));
    }
  };
};

export const getCurrentPoll = path => {
  return async dispatch => {
    try {
      const poll = await API.call('get', `polls/${path}`);
      dispatch(setCurrentPoll(poll));
      dispatch(removeError());
    } catch (err) {
      const { error } =
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : err.message || 'Something went wrong';
      dispatch(addError(error));
    }
  };
};

export const deletePoll = pollId => {
  return async dispatch => {
    try {
      const result = await API.call('delete', `polls/${pollId}`);
      dispatch(getPolls()); // Refresh the polls list after deletion
      dispatch(removeError());
      return result; // Return the result for potential use in the component
    } catch (err) {
      const error =
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : err.message || 'Something went wrong';
      dispatch(addError(error));
    }
  };
};

export const vote = (path, data) => {
  return async dispatch => {
    try {
      const poll = await API.call('post', `polls/${path}`, data);
      dispatch(setCurrentPoll(poll));
    } catch (err) {
      const { error } =
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : err.message || 'Something went wrong';
      dispatch(addError(error));
    }
  };
};
