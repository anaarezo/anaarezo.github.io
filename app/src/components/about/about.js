import React, { Component } from 'react';
export default class About extends Component {
  render() {
    return (
      <React.Fragment>
      {/*generated code*/}
      <section id="about">
        <div className="row">
          <div className="three columns">
            <img className="profile-pic" src="images/profilepic.jpg" alt="" />
          </div>
          <div className="nine columns main-col">
            <h2>About Me</h2>
            <p>Front-end Specialist, Postgraduate - MBA in Information Technology by Unisal and Graduated at FATEC in Technology of Analysis and Development of Systems, experience in analysis and development of web systems with knowledge on Front-end. 
            </p>
            <div className="row">
              <div className="columns contact-details">
                <h2>Contact Details</h2>
                <p className="address">
                  <span>Ana Laura Arezo</span><br />
                  <span>São Paulo/SP - Brazil<br />
                  
                  </span>
                  <span>+55 (11) 9.4899-7452</span><br />
                  <span>laura.arezo@gmail.com</span>
                </p>
              </div>
              <div className="columns download">
                <p>
                  <a href="https://www.linkedin.com/in/anaarezo/?locale=en_US" className="button" target="_blank"><i className="fa fa-download" />Download Resume</a>
                </p>
              </div>
            </div> {/* end row */}
          </div> {/* end .main-col */}
        </div>
      </section> {/* About Section End*/}
      </React.Fragment>
    );
  }
}