/**
 * App Header
 */
import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requiredSidebarPaths } from './routeUtils/sidebarConfig';
import capitalize from 'capitalize';
import Route_perms from '../../util/perm_control/route_perms';

function Sidebar() {
  var pathname = window.location.href;
  const [is_dev, setis_dev] = useState("block");
  const [sidebarPaths, setSidebarPaths] = useState(requiredSidebarPaths);

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
      all_routes_and_componants: getPaths(requiredSidebarPaths),
      Slash_redirect_to: null,
      route: null
    }
  );

  const removeUnusedPaths = async () => {
    console.log('allowed_to_display', allowed_to_display);

    let tempPaths = requiredSidebarPaths.map(sidebarPath1 => {
      if (sidebarPath1.path) {
        if (allowed_to_display.indexOf(sidebarPath1.path) > -1) {
          return sidebarPath1;
        }
      } else if (sidebarPath1.items) {

        let sidebarPath1Items = sidebarPath1.items.map(sidebarPath2 => {
          if (sidebarPath2.path) {
            if (allowed_to_display.indexOf(sidebarPath2.path) > -1) {
              return sidebarPath2;
            }
          } else if (sidebarPath2.items) {
            let sidebarPath2Items = sidebarPath2.items.map(sidebarPath3 => {
              if (allowed_to_display.indexOf(sidebarPath3.path) > -1) {
                return sidebarPath3;
              }
            });
            sidebarPath2Items = sidebarPath2Items.filter(item => item !== undefined);
            if (sidebarPath2Items.length > 0) {
              return { ...sidebarPath2, items: sidebarPath2Items };
            }
          }
        });

        sidebarPath1Items = sidebarPath1Items.filter(item => item !== undefined);
        if (sidebarPath1Items.length > 0) {
          return { ...sidebarPath1, items: sidebarPath1Items };
        }
      }
    });

    tempPaths = tempPaths.filter(item => item !== undefined);
    setSidebarPaths(tempPaths);
    console.log('tempPaths', tempPaths);
  };



  useEffect(() => {
    if (allowed_to_display.length > 0) {
      removeUnusedPaths();
    }
  }, [allowed_to_display.length]);

  return <div className="sidebar" id="sidebar">
    <div className="sidebar-inner slimscroll">
      <div id="sidebar-menu" className="sidebar-menu">

        <ul>
          {
            sidebarPaths.map((sidebarPath1, index1) => {
              return (
                <Fragment key={index1}>
                  <li
                    key={index1}
                    className='menu-title'
                    style={allowed_to_display.length > 0 ? sidebarPath1.title === 'employees' || sidebarPath1.title === 'administration' ? { display: is_dev } : {} : { display: 'none' }}
                  >{capitalize(sidebarPath1.title)}</li>
                  {
                    sidebarPath1.items.map((sidebarPath2, index2) => {
                      if (sidebarPath2.items) {
                        console.log('is_dev: ', is_dev);
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
                </Fragment>
              );
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


export default connect(mapStateToProps)(withRouter(Sidebar));

