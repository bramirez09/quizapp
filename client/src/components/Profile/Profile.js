import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Link, Navigate } from "react-router-dom"
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const Profile = () => {
  const score = localStorage.getItem("scores");
  const { username } = useParams();

  const { loading, data, error } = useQuery(username ? QUERY_USER : QUERY_ME, {
    variables: { username: username },
  });
console.log(data);
  const user = data?.me || data?.user || {};

  if (error) {
    console.log("Error:", error.message);
    return <div>Error occurred while fetching data {error.message}</div>;
  }
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === data) {
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
          <div className='profileCard' style={{width: "18rem"}}>
              <div className='card-body'>
                <h3>{user.username ? `${user.username}` : 'your'} </h3>
              </div>
            <ul className='list-group list-group-flush'>
              <li className="list-group-item">Your score is: {score}</li>
            </ul>
            <div className='card-link'>
              <Link className="cardLink btn-primary" as={Link} to='/'> Retake Quiz Here </Link>
            </div>
          </div>

          <div className='column'>

            <div className='col-sm-10'>
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
      </div>

    </div>
  );
};

export default Profile;