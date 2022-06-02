import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requiredSidebarPaths, requiredSidebarPathssettings } from './routeUtils/sidebarConfig';
import capitalize from 'capitalize';
import Route_perms from '../../util/perm_control/route_perms';

function Sidebar() {
  console.log("ths")
  var pathname = window.location.href;
  const [is_dev, setis_dev] = useState("block");

  const getPaths = (arrayOfPathObjects, arrayOfPaths = []) => {
    for (let i = 0; i < arrayOfPathObjects.length; i += 1) {
      let { path, items } = arrayOfPathObjects[i];
      if (path) {
        arrayOfPaths.push(path);
      } else if (items) {
        getPaths(items, arrayOfPaths);
      }
    }
    return arrayOfPaths;
  };

  const allowed_to_display = Route_perms(
    {
      match: null,
      all_routes_and_componants: getPaths(requiredSidebarPathssettings),
      Slash_redirect_to: null,
      route: null
    }
  );


  useEffect(() => {
    (async () => {

    })();
  }, []);

  return <div className="sidebar" id="sidebar">
    <div className="sidebar-inner slimscroll">
      <div id="sidebar-menu" className="sidebar-menu">

        <ul>
          <li>
            <a href="/app/main/welcome"><i className="la la-home" /> <span>Back to Home</span></a>
          </li>
          {
            requiredSidebarPathssettings.map((sidebarPath1, index1) => {
              return (<Fragment key={index1}>
                <li
                  key={index1}
                  className='menu-title'
                  style={allowed_to_display.length > 0 ? sidebarPath1.title === 'employees' || sidebarPath1.title === 'administration' ? { display: is_dev } : {} : { display: 'none' }}
                >{capitalize(sidebarPath1.title)}</li>
                {
                  sidebarPath1.items.map((sidebarPath2, index2) => {
                    if (sidebarPath2.items) {
                      return (
                        <li key={index2} className='submenu' style={allowed_to_display.length > 0 ? { display: is_dev } : { display: 'none' }}>
                          <a href="#">
                            <i className={sidebarPath2.iconClassName} />
                            <span> {capitalize(sidebarPath2.title)}</span>
                            <span className="menu-arrow" />
                          </a>
                          <ul style={sidebarPath2.title === 'jobs' ? { display: 'none' } : {}}>
                            {
                              sidebarPath2.items.map((sidebarPath3, index3) => {
                                if (allowed_to_display.indexOf(sidebarPath3.path) > -1) {
                                  return (
                                    <li
                                      key={index3}
                                      style={sidebarPath3.title === 'titles & depts' ? { display: is_dev } : {}}
                                    >
                                      <Link className={pathname.includes(sidebarPath3.activePath) ? "active" : ""} to={sidebarPath3.path}>
                                        {capitalize(sidebarPath3.title)}
                                      </Link>
                                    </li>
                                  );
                                } else {
                                  return null;
                                }
                              })
                            }
                          </ul>
                        </li>
                      );
                    } else {
                      if (allowed_to_display.indexOf(sidebarPath2.path) > -1) {
                        return (
                          <li key={index2} style={{ display: is_dev }}>
                            <a href={sidebarPath2.path}>
                              <i className={sidebarPath2.iconClassName} />
                              <span>{capitalize(sidebarPath2.title)}</span>
                            </a>
                          </li>
                        );
                      } else {
                        return null;
                      }
                    }
                  })
                }
              </Fragment>);
            })
          }
        </ul>

      </div>
    </div>
  </div>;


}


const mapStateToProps = (state) => ({
  permissions: state.data.employeePermissions.module_permission,
  roll: state.data.employeePermissions.roll_type,
  loading: state.data.loading
});

Sidebar.propTypes = {
  data: PropTypes.object,
};


export default withRouter(Sidebar);



/*

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Sidebar extends Component {
   render() {
    
    const {  location } = this.props
    let pathname = location.pathname

    return (
        <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div className="sidebar-menu">
            <ul>
              <li> 
                <a href="/app/main/welcome"><i className="la la-home" /> <span>Back to Home</span></a>
              </li>

              <li className={pathname.includes('permissions_&_defaults') ?"active" :""}> 
                <a href="/settings/permissions_&_defaults"><i className="la la-key" /> <span>Permissions &amp; Defaults</span></a>
              </li>
 
            </ul>
          </div>
        </div>
      </div>
       
      );
   }
}

export default withRouter(Sidebar);
*/

/* not required currently 
              <li className="menu-title">Settings</li>
              <li className={pathname.includes('companysetting') ?"active" :""}> 
                <a href="/settings/companysetting"><i className="la la-building" /> <span>Company Settings</span></a>
              </li>
              <li className={pathname.includes('localization') ?"active" :""}> 
                <a href="/settings/localization"><i className="la la-clock-o" /> <span>Localization</span></a>
              </li>
              <li className={pathname.includes('theme-') ?"active" :""}> 
                <a href="/settings/theme-settings"><i className="la la-photo" /> <span>Theme Settings</span></a>
              </li>
             <li className={pathname.includes('email-') ?"active" :""}> 
                <a href="/settings/email-settings"><i className="la la-at" /> <span>Email Settings</span></a>
              </li>
              <li className={pathname.includes('invoice-') ?"active" :""}> 
                <a href="/settings/invoice-settings"><i className="la la-pencil-square" /> <span>Invoice Settings</span></a>
              </li>
              <li className={pathname.includes('salary-') ?"active" :""}> 
                <a href="/settings/salary-settings"><i className="la la-money" /> <span>Salary Settings</span></a>
              </li>
              <li className={pathname.includes('notifications') ?"active" :""}> 
                <a href="/settings/notifications"><i className="la la-globe" /> <span>Notifications</span></a>
              </li>
              <li className={pathname.includes('-password') ?"active" :""}> 
                <a href="/settings/change-password"><i className="la la-lock" /> <span>Change Password</span></a>
              </li>
              <li className={pathname.includes('-type') ?"active" :""}> 
                <a href="/settings/leave-type"><i className="la la-cogs" /> <span>Leave Type</span></a>
              </li>

*/