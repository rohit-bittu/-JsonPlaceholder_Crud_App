import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts, deletePost } from '../Redux/Features/postSlice';
import { Link } from 'react-router-dom';


const Read = () => {

    const dispatch = useDispatch()
    const { Data, loading } = useSelector((state) => state?.app)


    useEffect(() => {
        dispatch(getPosts())
        dispatch(deletePost())
    }, [dispatch])
    return (
        <section id="team" className="pb-5">
            <div className="container mt-5 ">
                <h4 className="section-title  animate-charcter mb-5 " data-aos="flip-up">JSON API DATA UPDATED LENGTH : {Data.length}</h4>
                <Link to='/create' className="btn btn-primary text-white mb-4 ">ADD DATA</Link>
                <div className="row mb-5 ">

                    {/*From here we will start the map function of the product List*/}

                    {
                        loading ? "LOADING" :
                            Data?.map((item, index) => {

                                return (
                                    <>
                                        <div className="col-xs-12 col-sm-6 col-md-6 mb-5 col-lg-4 display-4" data-aos="zoom-in">
                                            <div className="image-flip " >
                                                <div className="mainflip flip-0 mb-5">

                                                    <div className="side">

                                                        <div className="card">
                                                            <div className="card-body text-center mt-4">
                                                                <h4 className="card-title">ID: {item.id} </h4>
                                                                <h5 className="card-title">USER_ID:  {item.userId}</h5>

                                                                <span className=" fs-2 text-danger fw-semibold nav-underline ">TITLE :</span>

                                                                <h5 className="card-text">{item.title}</h5> <hr />
                                                                <span className=" fs-2 text-success fw-semibold ">DESCRIPTION :</span>

                                                                <h5 className="card-text">{item.body}</h5>

                                                                {/* ITEM UPDATE AND DELETE*/}
                                                                <ul className="list-inline">
                                                                    <li className="list-inline-item">
                                                                        <Link to={`/Read/${item.id}`} className="btn btn-primary text-white">UPDATE</Link>

                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <button type="button" class="btn btn-danger"
                                                                            onClick={() => dispatch(deletePost(item.id))}
                                                                        > DELETE</button>
                                                                    </li>


                                                                </ul>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )

                            })




                    }

                    {/*From here we will end the map function of the product List*/}




                </div>
                <Link to='/create' className="btn btn-primary text-white mb-4 ">ADD DATA</Link>
            </div>
        </section>

    )
}

export default Read
