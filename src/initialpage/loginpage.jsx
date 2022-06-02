/**
 * Sign-in Firebase
 */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// form validation handling
import validateFields from '../Validator/Validation';

import { Applogo } from '../Entryfile/imagepath.jsx';
import {loginUser} from '../Redux/Actions/userActions';

const initialState = {
  email: {
    value: '',
    validateOnChange: false,
    error: ''
  },
  password: {
    value: '',
    validateOnChange: false,
    error: ''
  },
  submitCalled: false,
  auth: false,
  errors: null
};

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.loginClick = this.loginClick.bind(this);
  }

  componentDidMount() {
    if (this.props.authenticated) {
      window.location.href = "/app/main/welcome";
    }
  }

  loginClick(e) {
    e.preventDefault();

    const { email, password } = this.state;
    const emailError = validateFields.validateEmail(email.value);
    const passwordError = validateFields.validatePassword(password.value);

    if ([emailError, passwordError].every(e => e === false)) {
      this.props.loginUser({
        email: this.state.email.value,
        password: this.state.password.value
      }, this.props.history);
    } else {
      // update the state with errors
      this.setState(state => ({
        email: {
          ...state.email,
          validateOnChange: true,
          error: emailError
        },
        password: {
          ...state.password,
          validateOnChange: true,
          error: passwordError
        }
      }));
      return;
    }
  }

  handleBlur(validationFunc, evt) {
    const field = evt.target.name;
    // validate onBlur only when validateOnChange for that field is false
    // because if validateOnChange is already true there is no need to validate onBlur
    if (
      this.state[field]['validateOnChange'] === false &&
      this.state.submitCalled === false
    ) {
      this.setState(state => ({
        [field]: {
          ...state[field],
          validateOnChange: true,
          error: validationFunc(state[field].value)
        }
      }));
    }
    return;
  }

  handleChange(validationFunc, evt) {
    const field = evt.target.name;
    const fieldVal = evt.target.value;
    this.setState(state => ({
      [field]: {
        ...state[field],
        value: fieldVal,
        error: state[field]['validateOnChange'] ? validationFunc(fieldVal) : ''
      },
      auth: false
    }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.UI.errors !== prevProps.UI.errors) {
      this.setState(state => ({
        ...state,
        errors: this.props.UI.errors
      }));
    }

    if (prevProps.authenticated !== this.props.authenticated && this.props.authenticated) {
      window.location.href = "/app/job_seekers/dashboard";
    }
  }

  render() {
    const { email, password } = this.state;
    const loading = this.props.UI.loading;

    return (
      <div className="main-wrapper">
        <Helmet>
          <title>Login - Utopia Tech PTY LTD</title>
          <meta name="description" content="Login page" />
        </Helmet>

        <div className="account-content">
          <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">
            Apply Job
          </Link>

          <div className="container">
            {/* Account Logo */}
            <div className="account-logo">
              
              {/* // TODO(Umar): change div to <a href="/main/dashboard"></a> in case needed. */}
              <div><img src={Applogo} alt="Utopia Tech PTY LTD" /></div>
            </div>

            {/* /Account Logo */}
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Login</h3>
                <p className="account-subtitle">Access the portal</p>

                {/* Account Form */}
                <form onSubmit={this.loginClick}>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={email.value}
                      data-testid="login-form-username"
                      className={classnames(
                        'form-control',
                        { 'is-valid': email.error === false },
                        { 'is-invalid': email.error }
                      )}
                      onChange={evt =>
                        this.handleChange(validateFields.validateEmail, evt)
                      }
                      onBlur={evt =>
                        this.handleBlur(validateFields.validateEmail, evt)
                      }
                    />
                    <div className="invalid-feedback">{email.error}</div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label>Password</label>
                      </div>
                      <div className="col-auto">
                        <Link className="text-muted" to="/forgotpassword">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      data-testid="login-form-password"
                      value={password.value}
                      className={classnames(
                        'form-control',
                        { 'is-valid': password.error === false },
                        { 'is-invalid': password.error }
                      )}
                      onChange={evt =>
                        this.handleChange(validateFields.validatePassword, evt)
                      }
                      onBlur={evt =>
                        this.handleBlur(validateFields.validatePassword, evt)
                      }
                    />
                    <div className="invalid-feedback">{password.error}</div>
                  </div>
                  <div className="form-group text-center">
                    <button onMouseDown={() => this.setState({ submitCalled: true })} data-testid="login-form-submit" className="btn btn-primary account-btn" type="submit" disabled={loading}>Login</button>
                  </div>
                  <h5 className="auth-error">
                    {this.state.errors && (<div>
                      {this.state.errors}
                    </div>)}
                  </h5>
                  <div className="account-footer">
                    <p>Don't have an account yet? <Link to="/register">Register</Link></p>
                  </div>
                </form>
                {/* end /Account Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  UI: state.UI
});

LoginPage.propTypes = {
  user: PropTypes.object,
  UI: PropTypes.object.isRequired
};

const mapActionToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionToProps)(LoginPage);
