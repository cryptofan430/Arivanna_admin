/**
 * App Header
 */
import React, { Component, useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

import {
  headerlogo, lnEnglish, lnFrench, lnSpanish, lnGerman, Avatar_02, Avatar_03, Avatar_05,
  Avatar_06, Avatar_08, Avatar_09, Avatar_13, Avatar_17, Avatar_21
} from '../../Entryfile/imagepath'

import store from '../../Redux/Reducers/state';
import { logoutUser } from '../../Redux/Actions/userActions';
import api from '../../api_hander/handler';


async function return_api_data() {
  let data = {
    ...{ auth: localStorage.getItem("token") },// if an auth is required
  };
  const response = await api.handler
    .api_post(data, `getuser_id`)
    .then(async (response) => {
      if (response.success) {//success
        return response
      } else {//failed, though handled by server backend with custom fail response 
      }
    })
    .catch(async (e) => {//failure not handled by custom backend function 
      console.log("Unhandled Error: ", e)
    });
  return response.data.employee_id
}

function Header() {
  const [permissions, setpermissions] = useState([]);
  const [is_dev, setis_dev] = useState("none");
  const [employees, setemployees] = useState([]);
  const [employee_id, setemployee_id] = useState([]);


  useEffect(() => {
    (async () => {

      const employee_id = await return_api_data()

      let data = {
        auth: localStorage.getItem("token"),
        user_id: employee_id
      };

      await api.handler
        .api_post(data, `user`)
        .then((response) => {
          if (response.success) {//success
            setemployees(response.data.emp)
          } else {//failed, though handled by server backend with custom fail response 
          }
        })
        .catch((e) => {//failure not handled by custom backend function 
          console.log("Unhandled Error: ", e)
        });







      data = {
        auth: localStorage.getItem("token"),
      };

      await api.handler
        .api_post(data, `employeePermission`)
        .then(async (response) => {
          if (response.success) {//success
            await set_perm(response.data)
          }
          else {//failed, though handled by server backend with custom fail response 
            console.log("errora")
          }
        })
        .catch((e) => {//failure not handled by custom backend function 
          console.log("Unhandled Error: ", e)
        });


    })();
  }, []);

  async function set_perm(prem) {
    await setpermissions(prem)
    setemployee_id(prem.employee_id)
    prem = prem.module_permission

    prem?.map((p, i) => {
      if (p.type === "both") {
        if (p.name === "dev" && p.read) {
          setis_dev('block')
        }
      }
    })
  }


  return (
    <div className="header" style={{ right: "0px" }}>
      {/* Logo */}
      <div className="header-left">
        <Link to="/app/main/dashboard" className="logo">
          <img src={headerlogo} width={40} height={40} alt="" />
        </Link>
      </div>
      {/* /Logo */}
      {
        // <a id="toggle_btn" href="" style={{ display: pathname.includes('tasks') ? "none" : pathname.includes('compose') ? "none" : "" }}>

      }
      <a id="toggle_btn" href="" >


        <span className="bar-icon"><span />
          <span />
          <span />
        </span>
      </a>
      {/* Header Title */}
      <div className="page-title-box">
        <h3>Utopia Tech PTY LTD</h3>
      </div>
      {/* /Header Title */}
      <a id="mobile_btn" className="mobile_btn" href="#sidebar"><i className="fa fa-bars" /></a>
      {/* Header Menu */}
      <ul className="nav user-menu">
        {/* Search */}
        <li hidden style={{ display: is_dev }} className="nav-item">
          <div className="top-nav-search">
            <a href="" className="responsive-search">
              <i className="fa fa-search" />
            </a>
            <form action="/pages/search">
              <input className="form-control" type="text" placeholder="Search here" />
              <button className="btn" type="submit"><i className="fa fa-search" /></button>
            </form>
          </div>
        </li>
        {/* /Search */}
        {/* Flag */}
        <li hidden style={{ display: is_dev }} className="nav-item dropdown has-arrow flag-nav">
          <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button">
            <img src={lnEnglish} alt="" height={20} /> <span>English</span>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a href="" className="dropdown-item">
              <img src={lnEnglish} alt="" height={16} /> English
            </a>
            <a href="" className="dropdown-item">
              <img src={lnFrench} alt="" height={16} /> French
            </a>
            <a href="" className="dropdown-item">
              <img src={lnSpanish} alt="" height={16} /> Spanish
            </a>
            <a href="" className="dropdown-item">
              <img src={lnGerman} alt="" height={16} /> German
            </a>
          </div>
        </li>
        {/* /Flag */}
        {/* Notifications */}
        <li hidden style={{ display: is_dev }} className="nav-item dropdown">
          <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
            <i className="fa fa-bell-o" /> <span className="badge badge-pill">3</span>
          </a>
          <div className="dropdown-menu notifications">
            <div className="topnav-dropdown-header">
              <span className="notification-title">Notifications</span>
              <a href="" className="clear-noti"> Clear All </a>
            </div>
            <div className="noti-content">
              <ul className="notification-list">
                <li className="notification-message">
                  <a href="/administrator/activities">
                    <div className="media">
                      <span className="avatar">
                        <img alt="" src={Avatar_02} />
                      </span>
                      <div className="media-body">
                        <p className="noti-details"><span className="noti-title">John Doe</span> added new task <span className="noti-title">Patient appointment booking</span></p>
                        <p className="noti-time"><span className="notification-time">4 mins ago</span></p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="/administrator/activities">
                    <div className="media">
                      <span className="avatar">
                        <img alt="" src={Avatar_03} />
                      </span>
                      <div className="media-body">
                        <p className="noti-details"><span className="noti-title">Tarah Shropshire</span> changed the task name <span className="noti-title">Appointment booking with payment gateway</span></p>
                        <p className="noti-time"><span className="notification-time">6 mins ago</span></p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="/administrator/activities">
                    <div className="media">
                      <span className="avatar">
                        <img alt="" src={Avatar_06} />
                      </span>
                      <div className="media-body">
                        <p className="noti-details"><span className="noti-title">Misty Tison</span> added <span className="noti-title">Domenic Houston</span> and <span className="noti-title">Claire Mapes</span> to project <span className="noti-title">Doctor available module</span></p>
                        <p className="noti-time"><span className="notification-time">8 mins ago</span></p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="/administrator/activities">
                    <div className="media">
                      <span className="avatar">
                        <img alt="" src={Avatar_17} />
                      </span>
                      <div className="media-body">
                        <p className="noti-details"><span className="noti-title">Rolland Webber</span> completed task <span className="noti-title">Patient and Doctor video conferencing</span></p>
                        <p className="noti-time"><span className="notification-time">12 mins ago</span></p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="/administrator/activities">
                    <div className="media">
                      <span className="avatar">
                        <img alt="" src={Avatar_13} />
                      </span>
                      <div className="media-body">
                        <p className="noti-details"><span className="noti-title">Bernardo Galaviz</span> added new task <span className="noti-title">Private chat module</span></p>
                        <p className="noti-time"><span className="notification-time">2 days ago</span></p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <a href="/administrator/activities">View all Notifications</a>
            </div>
          </div>
        </li>
        {/* /Notifications */}
        {/* Message Notifications */}
        <li hidden style={{ display: is_dev }} className="nav-item dropdown">
          <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
            <i className="fa fa-comment-o" /> <span className="badge badge-pill">8</span>
          </a>
          <div className="dropdown-menu notifications">
            <div className="topnav-dropdown-header">
              <span className="notification-title">Messages</span>
              <a href="" className="clear-noti"> Clear All </a>
            </div>
            <div className="noti-content">
              <ul className="notification-list">
                <li className="notification-message">
                  <a href="/conversation/chat">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">
                          <img alt="" src={Avatar_09} />
                        </span>
                      </div>
                      <div className="list-body">
                        <span className="message-author">Richard Miles </span>
                        <span className="message-time">12:28 AM</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="/conversation/chat">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">
                          <img alt="" src={Avatar_02} />
                        </span>
                      </div>
                      <div className="list-body">
                        <span className="message-author">John Doe</span>
                        <span className="message-time">6 Mar</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="/conversation/chat">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">
                          <img alt="" src={Avatar_03} />
                        </span>
                      </div>
                      <div className="list-body">
                        <span className="message-author"> Tarah Shropshire </span>
                        <span className="message-time">5 Mar</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="/conversation/chat">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">
                          <img alt="" src={Avatar_05} />
                        </span>
                      </div>
                      <div className="list-body">
                        <span className="message-author">Mike Litorus</span>
                        <span className="message-time">3 Mar</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="/conversation/chat">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">
                          <img alt="" src={Avatar_08} />
                        </span>
                      </div>
                      <div className="list-body">
                        <span className="message-author"> Catherine Manseau </span>
                        <span className="message-time">27 Feb</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <a href="/conversation/chat">View all Messages</a>
            </div>
          </div>
        </li>
        {/* /Message Notifications */}
        <li className="nav-item dropdown has-arrow main-drop">
          <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">

            <span className="user-img">


              {

                employees?.map((e) => (
                  // console.log(e),

                  e?.img_url ?
                    (<img key={e?.id} alt="" src={"https://firebasestorage.googleapis.com/v0/b/hr-v2-79983.appspot.com/o/employees%2F" + e?.img_url} />)

                    :
                    (<img src={Avatar_21} alt="" />)
                ))
              }


              <span className="status online" /></span>
            {//console.log("bbbbbbbbbbb: ", employees),
              employees?.map((e) => (

                <span key={e.id}>{e.user_name}</span>

              ))}
          </a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href={
              "/app/profile/employee-profile/" + employee_id
            }>My Profile</a>
            <a style={{ display: is_dev }} className="dropdown-item" href="/settings/companysetting">Settings</a>
            <Link onClick={() => {
              store.dispatch(logoutUser());
            }} className="dropdown-item" to="/login">Logout</Link>
          </div>
        </li>
      </ul>
      {/* /Header Menu */}
      {/* Mobile Menu */}
      <div className="dropdown mobile-user-menu">
        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
        <div className="dropdown-menu dropdown-menu-right">
          <a className="dropdown-item" href="/app/profile/employee-profile">My Profile</a>
          <a className="dropdown-item" href="/app/settings/companysetting">Settings</a>
          <a className="dropdown-item" href="/login">Logout</a>
        </div>
      </div>
      {/* /Mobile Menu */}
    </div>

  );
}


export default withRouter(Header);