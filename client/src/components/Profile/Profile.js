import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import '../../components/Profile/Profile.css'
import Auth from '../../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  console.log("userparam:", userParam);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in! 
      </h4>
    );
  }

  return (
    <div>
      <div className='flex-row justify-center mb-3'>
        <h2 className="Banner p-3 mb-5">
          Viewing {user.username ? `${user.username}'s` : 'your'} profile
        </h2>

        <div className='row'>
          {/* PROFILE CARD / EXAMPLE SHELL */}
          <div className='profileCard col-sm-3' style={{width: "18rem"}}>
            <img className="profileIcon" src={require('../../assets/frog-hat.jpg')} alt="Card image cap" />
              <div className='card-body'>
                <h3>{user.username ? `${user.username}` : 'your'} </h3>
              </div>
            <ul className='list-group list-group-flush'>
              <li className="list-group-item"><h5> Your score is:</h5> </li>
            </ul>
            <div className='card-link'>
              <Link className="btn btn-primary" as={Link} to='/'> <h6>Retake Quiz Here</h6> </Link>
            </div>
          </div>

          <div className='column'>

            <div className='col-sm-12'>
              <div className='card'>
                <div className='cardBody'>
                  <h5 className='card-title'>TAKE NEXT QUIZ</h5>
                  <p className='card-text'>Continue your journey. Take another quiz in your journey in becoming a Coding Wizard.</p>
                  <a href=" " className="btn btn-primary">Next</a>
                </div>
              </div>
            </div>

          </div>




        </div>

        
        

      {/* <div className="col-12 col-md-10 mb-3 p-3" style={{ border: '1px dotted #1a1a1a' }}>
        <h3>Quizzes Taken</h3>
      </div> */}

      </div>

    </div>
  );
};

export default Profile;