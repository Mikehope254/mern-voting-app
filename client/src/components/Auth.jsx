import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { authUser } from '../store/actions';

const Auth = ({ authType = 'login' }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authUser(authType, formData));
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="username">
          username{' '}
        </label>
        <input
          type="text"
          value={formData.username}
          name="username"
          onChange={handleChange}
          autoComplete="off"
          className="form-input"
        />
        <label className="form-label" htmlFor="password">
          password{' '}
        </label>
        <input
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          autoComplete="off"
          className="form-input"
        />
        <div className="buttons_center">
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
