import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Provider as AlertProvider } from 'react-alert'
import c_t from '../componants/alerts/alert_template'
import AlertTemplate from 'react-alert-template-basic'

import { getEmployeePermissions } from '../Redux/Actions/dataActions';

// We will create these two pages in a moment
// Authentication
import LoginPage from './loginpage'
import RegistrationPage from './RegistrationPage'
import ForgotPassword from './forgotpassword'
import OTP from './otp'
import LockScreen from './lockscreen'
import ApplyJobs from './ApplyJob';
import InitialPath from '../util/authUser'

//Main App
import DefaultLayout from './Sidebar/DefaultLayout';
import Settinglayout from './Sidebar/Settinglayout';
import Tasklayout from './Sidebar/tasklayout';
import Emaillayout from './Sidebar/emaillayout';
import chatlayout from './Sidebar/chatlayout';

import uicomponents from '../MainPage/UIinterface/components';

//Error Page
import Error404 from '../MainPage/Pages/ErrorPage/error404';
import Error500 from '../MainPage/Pages/ErrorPage/error500';
import Welcome from './../MainPage/Main/Dashboard/welcome';


// import 'Assets/css/font-awesome.min.css';

import $ from 'jquery';

window.jQuery = $;
window.$ = $;


// optional cofiguration
const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '5px',
    transition: 'scale',

}

const customAlertTemplate = ({ message }) => (
    <div className="alert alert-primary">{message}</div>
);

// import UserPage from './pages/UserPage'

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getEmployeePermissions();

        if (location.pathname.includes("login") || location.pathname.includes("register") || location.pathname.includes("forgotpassword")
            || location.pathname.includes("otp") || location.pathname.includes("lockscreen")) {
            $('body').addClass('account-page');
        } else if (location.pathname.includes("error-404") || location.pathname.includes("error-500")) {
            $('body').addClass('error-page');
        }
    }




    render() {
        let { location, match, authenticated } = this.props;


        if (location.pathname === '/') {
            if (authenticated) {
                return (<Redirect to={'/app/main/welcome'} />);
            } else {
                return (<Redirect to={'/login'} />);
            }
        }

        return (
            <AlertProvider template={c_t} {...options}>
                <Switch>
                    <InitialPath
                        component={DefaultLayout}
                        path={`${match.url}app`}
                    />
                    <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
                    <Route path="/welcome" component={Welcome} />

                    <Route path="/login" component={LoginPage} />
                    <Route path="/forgotpassword" component={ForgotPassword} />
                    <Route path="/register" component={RegistrationPage} />
                    <Route path="/otp" component={OTP} />
                    <Route path="/lockscreen" component={LockScreen} />
                    <Route path="/applyjob" component={ApplyJobs} />

                    <Route path="/app" component={DefaultLayout} />
                    <Route path="/settings" component={Settinglayout} />
                    <Route path="/tasks" component={Tasklayout} />
                    <Route path="/email" component={Emaillayout} />
                    <Route path="/conversation" component={chatlayout} />

                    <Route path="/ui-components" component={uicomponents} />
                    <Route path="/error-404" component={Error404} />
                    <Route path="/error-500" component={Error500} />
                </Switch>
            </AlertProvider>

        );
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

App.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object
};

const mapActionToProps = {
    getEmployeePermissions
}

export default connect(mapStateToProps, mapActionToProps)(withRouter(App));

