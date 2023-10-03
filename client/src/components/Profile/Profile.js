import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_USER } from '../../utils/mutations';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import '../../components/Profile/Profile.css'
import Auth from '../../utils/auth';

const Profile = () => {

  const score = localStorage.getItem("scores");
  
  const { username: userParam } = useParams();

  console.log("userparam:", username);

  const { loading, data, error } = useQuery(username ? QUERY_USER : QUERY_ME, {
    variables: { username: username },
  });

  const user = data?.me || data?.user || {};

  const [deleteUser] = useMutation(DELETE_USER);

  async function deleteMe() {
    try {
      // TODO: Does this give the username of who's logged in
      //delete user has a button but need to test functionality 
      const { data } = await deleteUser({
        variables: { username:data?.username },
      });

      Auth.logout(); 
    } catch (err) {
      console.log(err)
    }
  }

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
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
              <img className="profileIcon" src={require('../../assets/profileIcon.png')} alt="Card image cap" />
              <ul className='list-group list-group-flush'>
                <li className="list-group-item"><h5> Your score is: {score} </h5> </li>
              </ul>
              <ul className='list-group list-group-flush'>
                <Link className="btn btn-primary" as={Link} to='/'> <h6>Retake Quiz Here</h6> </Link>
              </ul>
              
              </div>


        </div>

        <div className='deleteContainer'>
            
        <Link className='btn btn-secondary' onClick={(e)=>deleteMe()}><h6 className='type'>Delete Profile</h6></Link>

        </div>
        

      {/* <div className="col-12 col-md-10 mb-3 p-3" style={{ border: '1px dotted #1a1a1a' }}>
        <h3>Quizzes Taken</h3>
      </div> */}

      </div>

    </div>
  );
};

export default Profile;