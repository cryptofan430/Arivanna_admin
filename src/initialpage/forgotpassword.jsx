/**
 * Signin Firebase
 */

import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom'

import { Applogo } from '../Entryfile/imagepath.jsx'

class ForgotPassword extends Component {

  render() {
    return (
      <div className="main-wrapper">
        <Helmet>
          <title>Forgot Password - Utopia Tech PTY LTD</title>
          <meta name="description" content="Login page" />
        </Helmet>
        <div className="account-content">
          <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">Apply Job</Link>
          <div className="container">
            {/* Account Logo */}
            <div className="account-logo">
              {/* // TODO(Umar): change div to <a href="/main/dashboard"></a> in case needed. */}
              <div><img src={Applogo} alt="Utopia Tech PTY LTD" /></div>
            </div>
            {/* /Account Logo */}
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Forgot Password?</h3>
                <p className="account-subtitle">Email/Contact HR to reset your password.</p>
                {/* Account Form */}
                {/* <form>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="form-group text-center">
                    <button className="btn btn-primary account-btn" type="submit">Reset Password</button>
                  </div>
                  <div className="account-footer">
                    <p>Remember your password? <Link to="/login">Login</Link></p>
                  </div>
                </form> */}
                {/* /Account Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default ForgotPassword;
