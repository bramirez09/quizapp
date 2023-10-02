import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_USER } from '../../utils/mutations';


import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const Profile = () => {

  const { username } = useParams();

  const { loading, data, error } = useQuery(username ? QUERY_USER : QUERY_ME, {
    variables: { username: username },
  });
console.log(data);
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

  if (error) {
    console.log("Error:", error.message);
    return <div>Error occurred while fetching data {error.message}</div>;
  }
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().username === username) {
        return (
      <div>
        <div className='flex-row justify-center mb-3'>
          <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
            Viewing {user.username ? `${user.username}'s` : 'your'} profile.
          </h2>
  
        <div className="col-12 col-md-10 mb-5">
        <h3>Quiz Score</h3> 
        {loading || (user.totalScore ? user.totalScore : (<i>No Score</i>))} 
        </div>
  
        {/* <div className="col-12 col-md-10 mb-3 p-3" style={{ border: '1px dotted #1a1a1a' }}>
          <h3>Quizzes Taken</h3>
        </div> */}
  
        <button onClick={(e)=>deleteMe()}>Delete Profile</button>

        </div>
  
      </div>
    );
  }

};

export default Profile;


  //   if (loading) {
  //   return <div><h3>Loading...</h3></div>;
  // }

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in! 
  //     </h4>
  //   );
  // }

