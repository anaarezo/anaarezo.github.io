import React, { Component } from 'react';
export default class Footer extends Component {
  render() {
    return (
      <React.Fragment>
      {/*generated code*/}
      <footer>
        <div className="row">
          <div className="twelve columns">
            <ul className="social-links">
              {/*<li><a href="#"><i className="fa fa-facebook" /></a></li>*/}
              {/*<li><a href="#"><i className="fa fa-twitter" /></a></li>*/}
              {/*<li><a href="#"><i className="fa fa-google-plus" /></a></li>*/}
              <li><a href="https://www.linkedin.com/in/anaarezo/" target="_blank"><i className="fa fa-linkedin" /></a></li>
              <li><a href="https://instagram.com/anaarezo" target="_blank"><i className="fa fa-instagram" /></a></li>
              {/*<li><a href="#"><i className="fa fa-dribbble" /></a></li>*/}
              <li><a href="https://wa.me/5511948997452" target="_blank"><i className="fa fa-phone" /></a></li>
            </ul>
            <ul className="copyright">
              <li>© Copyright 2019 Ana Arezo</li>
              {/*<li>Design by <a title="Styleshout" href="http://www.styleshout.com/">Styleshout</a></li> */}  
            </ul>
          </div>
          <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open" /></a></div>
        </div>
      </footer> {/* Footer End*/}
      </React.Fragment>
    );
  }
}