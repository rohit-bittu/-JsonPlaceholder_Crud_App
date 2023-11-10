import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createPost } from '../Redux/Features/postSlice'


const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [values, setValues] = useState({
    title: '',
    body: '',
    userId: 11, // Assuming a default user ID
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the createPost async thunk with the form data
    dispatch(createPost(values));

    // Clear the form after submission
    setValues({ title: '', body: '', userId: '' });
    navigate('/')
  };

  return (
    <div className='container'>
      <div className='row'>
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label for="exampleDropdownFormEmail1">
              Title:</label>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              required
              className='form-control'
              id="exampleDropdownFormEmail1"
            />
          </div>
          <div className='form-group'>
            <label for="exampleDropdownFormEmail1">
              Body:

            </label>
            <textarea
              name="body"
              value={values.body}
              onChange={handleChange}
              required
              className='form-control py-5'
              id="exampleDropdownFormEmail1"
            />
            <br />
          </div>

          <br />

          <button type="submit" className='btn btn-primary'>Create Post</button>
        </form> 
        <Link className=' text-danger mt-3' to="/">GO BACK</Link>
      </div>
    </div>

  );
};

export default Create
