import React from 'react';
import '../../components/Profile/Profile.css'


const Profile = () => {
  


  return (
    <div>

      {/* USER DATA  */}
      <div className="flex-row justify-center mb-3">
        <h2 className="Banner text-light p-3 mb-5 mt-4">
          {/* Viewing {userParam ? `${user.username}'s` : 'your'} profile. */}
        </h2>

        <div className="row">
            {/* PROFILE CARD / EXAMPLE SHELL */}
            <div className="profileCard" style={{width: "18rem"}}>
              <img className="profileIcon" src={require('../../assets/frog-hat.jpg')} alt="Card image cap" />
                <div className="card-body">
                  <h3>USER NAME</h3>
                </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Your score is: </li>
              </ul>
              <div className="card-link">
                <a href="#" class="card-link">Link to Quiz</a>
              </div>

            </div>

          {/* QUIZ CARDS W/ LINKS */}
          <div className="column">

            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Quiz Option 1</h5>
                  <p className="card-text">Detailed description of this quiz. HTML/ CSS/ JAVA/ React/ Node...ect</p>
                  <a href=" " class="btn btn-primary">Take Quiz</a>
                </div>
              </div>
            </div>

            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Quiz Option 2</h5>
                  <p className="card-text">Detailed description of this quiz. HTML/ CSS/ JAVA/ React/ Node...ect</p>
                  <a href=" " class="btn btn-primary">Take Quiz</a>
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