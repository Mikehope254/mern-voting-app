import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getCurrentPoll } from '../store/actions';

import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import PollPage from '../pages/PollPage';
import CreatePollPage from '../pages/CreatePollPage';
import TestPage from '../pages/TestPage';

const RouteViews = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <AuthPage authType="login" isAuthenticated={auth.isAuthenticated} />
          }
        />
        <Route
          path="/register"
          element={
            <AuthPage
              authType="register"
              isAuthenticated={auth.isAuthenticated}
            />
          }
        />
        <Route
          path="/poll/new"
          element={<CreatePollPage isAuthenticated={auth.isAuthenticated} />}
        />
        <Route
          path="/poll/:id"
          element={<PollPage getPoll={id => dispatch(getCurrentPoll(id))} />}
        />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </main>
  );
};

export default RouteViews;
