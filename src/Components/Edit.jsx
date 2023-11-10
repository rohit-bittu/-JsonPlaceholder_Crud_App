import React, { useState, useEffect } from 'react'
import { editPost, getPosts } from '../Redux/Features/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';


const Edit = () => {
    const {id } = useParams();
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const {Data} = useSelector((state) =>state?.app);
    const [values, setValues] = useState({
      title: '',
      body: '',
      userId:10
    });
  
    // Fetch the Data if they are not already available
    useEffect(() => {
      dispatch(getPosts());
    }, [dispatch]);
  
   
    const DatatoEdit = Data.find((post) => post.id === parseInt(id));
  
    // Set the initial data when the post is available
    useEffect(() => {
      if (DatatoEdit) {
        setValues({
          title: DatatoEdit.title,
          body: DatatoEdit.body,
          userId:DatatoEdit.userId
        });
      }
    }, [DatatoEdit]);
  
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Dispatch the editPost async thunk with the post ID and updated data
      dispatch(editPost({ id: parseInt(id), updatedData: values }));
  
      // Redirect to the post details page after editing
      Navigate('/')
    };
  
    if (!DatatoEdit) {
      return <div>Loading...</div>;
    }
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

                    <button type="submit" className='btn btn-primary'>Update Post</button>
                </form>
                <Link className=' text-danger mt-3' to="/">GO BACK</Link>
            </div>
        </div>
    )
}

export default Edit
