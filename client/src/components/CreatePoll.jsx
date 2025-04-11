import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';

import { createPoll } from '../store/actions';

const CreatePoll = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleChange = e => setQuestion(e.target.value);

  const handleAnswer = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const addAnswer = () => {
    setOptions([...options, '']);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createPoll({ question, options }));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="question">
        question
      </label>
      <input
        className="form-input"
        type="text"
        name="question"
        value={question}
        onChange={handleChange}
      />

      <div className="container">
        {options.map((option, i) => (
          <Fragment key={i}>
            <label className="form-label">option</label>
            <input
              className="form-input"
              type="text"
              value={option}
              onChange={e => handleAnswer(e, i)}
            />
          </Fragment>
        ))}
      </div>
      <div className="buttons_center">
        <button className="button" type="button" onClick={addAnswer}>
          Add options
        </button>
        <button className="button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreatePoll;
