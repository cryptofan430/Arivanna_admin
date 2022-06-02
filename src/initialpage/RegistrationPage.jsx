/**
 * Signin Firebase
 */
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import { notification, Skeleton } from 'antd';
import api from '../../src/api_hander/handler';

import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { createTimeStamp, dateToTimeStamp, timeStampToDate } from '../../src/util/momentHelper';

import { Applogo } from '../Entryfile/imagepath.jsx';
import 'antd/dist/antd.css';
import Input from '../../src/util/Components/Input';
import Button from '../../src/util/Components/Button';
function Registrationpage(props) {




  // handle submit the form
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("attempt")

    const perm_ids = JSON.parse(process.env.JOB_SEEKER_MODULE_PERM_ID)
    const perms = perm_ids.map((item, index) => {
      return {
        name: 'Job Seeker',
        type: 'route',
        id: 1,
        module_id: item,
        employee_id: 1,
        read: 1,
        write: 1,
        create: 1,
        delete: 1,
        import: 1,
        export: 1,
        is_active: 1,
        created_at: '1970-01-01T14:00:01.000Z',
        created_by: 1,
        updated_at: '1970-01-01T14:00:01.000Z',
        updated_by: 1
    }
  })

    const modulePermissions = {
      ...perms

    }
    const data = {
      "first_name": document.getElementById('first_name').value,
      "last_name": document.getElementById('last_name').value,
      "user_name": document.getElementById('first_name').value + " " + document.getElementById('last_name').value,
      "email": document.getElementById('email').value,
      "password": document.getElementById('password').value,
      "joining_date": createTimeStamp(),
      "phone": document.getElementById('phone_number').value,
      "company_id": await process.env.JOB_SEEKER_COMPANY_ID,
      "department_id": process.env.JOB_SEEKER_DEPT_ID,
      "designation_id": process.env.JOB_SEEKER_TITLE_ID,
      "is_active": "1",
      "roll_id": "1",
      "created_at": createTimeStamp(),
      "created_by": 1,
      "updated_at": createTimeStamp(),
      "updated_by": 1,
      "module_permission": modulePermissions
    };

    console.log("this: ", data)
    try {

      await api.handler
        .api_post(data, 'employee/create')
        .then(async (response) => {
          if (response.success) {//success
            const msg = "Employee created successfully";
            await notification.success({
              message: 'Success!',
              description: msg,
              duration: 5
            });
            localStorage.removeItem('jobview')
            props.history.push('/login')
          } else {//failed, though handled by server backend with custom fail response 
            const msg = "Employee creation failed";
            await notification.error({
              message: 'Error!',
              description: msg,
              duration: 5
            });
          }
        })
        .catch(async (e) => {//failure not handled by custom backend function 
          console.log("Unhandled error: ", error)
          await notification.error({
            message: 'Error!',
            description: 'Internal Server Error',
            duration: 5
          });
        });


    } catch (error) {
      console.log("Unhandled error: ", error)
      await notification.error({
        message: 'Error!',
        description: 'Internal Server Error',
        duration: 5
      });
    }
  }

  return (

    <div className="main-wrapper">
      <Helmet>
        <title>Register - Utopia Tech PTY LTD</title>
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
              <h3 className="account-title">Register</h3>
              <p className="account-subtitle">Access to the portal</p>

              {/* Account Form */}
              <form onSubmit={(e) => { e.preventDefault(); }}>
                <div className="form-group">
                  <label>First Name</label>
                  <input id='first_name' className="form-control" type="text" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input id='last_name' className="form-control" type="text" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input id='phone_number' className="form-control" type="text" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input id='email' className="form-control" type="text" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input id='password' className="form-control" type="password" />
                </div>
                <div className="form-group">
                  <label>Repeat Password</label>
                  <input className="form-control" type="password" />
                </div>
                <div className="form-group text-center">
                  <button onClick={handleSubmit} className="btn btn-primary account-btn" type="submit">Register</button>
                </div>
                <div className="account-footer">
                  <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
              </form>
              {/* /Account Form */}
            </div>
          </div>
        </div>
      </div>



    </div>
  );

}


export default Registrationpage;
