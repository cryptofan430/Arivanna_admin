import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDepartments, getopenJobs } from '../../Redux/Actions/dataActions';

import { headerlogo, lnEnglish, lnFrench, lnSpanish, lnGerman } from '../../Entryfile/imagepath.jsx'
import { getDays } from "../../util/momentHelper";

class JobsList extends Component {
  constructor(params) {
    super(params);
  }

  componentDidMount() {

    let { authenticated } = this.props;
    if (authenticated) {
      window.location.href = "/app/job_seekers/all-jobs ";
      return;
    }



    window.scrollTo(0, 0);

    if (this.props.jobs?.length === 0) {
      this.props.getopenJobs();
    }

    if (this.props.departments?.length === 0) {
      this.props.getDepartments({});
    }
  }

  render() {
    return (
      <div className="main-wrapper">
        <Helmet>
          <title>Jobs - Utopia Tech PTY LTD</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Header */}
        <div className="header">
          {/* Logo */}
          <div className="header-left">
            <Link to="/app/main/dashboard" className="logo">
              <img src={headerlogo} width={40} height={40} alt="" />
            </Link>
          </div>
          {/* /Logo */}

          {/* Header Title */}
          <div className="page-title-box float-left">
            <h3>Utopia Tech PTY LTD</h3>
          </div>
          {/* /Header Title */}

          {/* Header Menu */}
          <ul className="nav user-menu">
            {/* Search */}
            <li hidden className="nav-item">
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
            <li hidden className="nav-item dropdown has-arrow flag-nav">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button">
                <img src={lnEnglish} alt="" height={20} /> <span>English</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a href="#" className="dropdown-item">
                  <img src={lnEnglish} alt="" height={16} /> English
                </a>
                <a href="#" className="dropdown-item">
                  <img src={lnFrench} alt="" height={16} /> French
                </a>
                <a href="#" className="dropdown-item">
                  <img src={lnSpanish} alt="" height={16} /> Spanish
                </a>
                <a href="#" className="dropdown-item">
                  <img src={lnGerman} alt="" height={16} /> German
                </a>
              </div>
            </li>
            {/* /Flag */}

            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          </ul>
          {/* /Header Menu */}

          {/* Mobile Menu */}
          <div className="dropdown mobile-user-menu">
            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
            <div className="dropdown-menu dropdown-menu-right">
              <Link className="dropdown-item" to="/login">Login</Link>
              <Link className="dropdown-item" to="/register">Register</Link>
            </div>
          </div>
          {/* /Mobile Menu */}
        </div>
        {/* /Header */}

        {/* Page Wrapper */}
        <div className="page-wrapper job-wrapper">
          {/* Page Content */}
          <div className="content container">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Jobs</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/app/main/welcome">Dashboard</Link></li>
                    <li className="breadcrumb-item active">Jobs</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-md-6">
                {this.props.jobs?.map(job => (
                  <Link className="job-list" to={`/applyjob/jobdetail/` + job.id_job_posts} key={job.id_job_posts}>
                    <div className="job-list-det">
                      <div className="job-list-desc">
                        <h3 className="job-list-title">{job.title}</h3>
                        <h4 className="job-department">{this.props.departments?.find(department => department.id === job?.dep_id)?.department_name}</h4>
                      </div>
                      <div className="job-type-info">
                        <span className="job-types">{job.type}</span>
                      </div>
                    </div>
                    <div className="job-list-footer">
                      <ul>
                        <li><i className="fa fa-map-signs" /> {job.location}</li>
                        <li><i className="fa fa-money" /> ${job.min_salary}-${job.max_salary}</li>
                        <li><i className="fa fa-clock-o" />{String(getDays(job.created_at)).charAt(0).toUpperCase() + String(getDays(job.created_at)).slice(1)}</li>
                      </ul>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  jobs: state.data.jobs,
  departments: state.data.departments,
  loading: state.data.loading,
  authenticated: state.user.authenticated

});

JobsList.propTypes = {
  data: PropTypes.object
};

const mapActionToProps = {
  getopenJobs,
  getDepartments,
};

export default connect(mapStateToProps, mapActionToProps)(JobsList);
