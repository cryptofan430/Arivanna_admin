// Import the functions you need from the SDKs you need
import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";

import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notification, Skeleton } from "antd";

import { getDepartments, getJob, applyJob, getJobMaverick } from '../../Redux/Actions/dataActions';
import { headerlogo, lnEnglish, lnFrench, lnSpanish, lnGerman } from '../../Entryfile/imagepath.jsx';

import Button from "../../util/Components/Button";
import Input from "../../util/Components/Input";
import { createTimeStamp, dateToCounter, timeStampToDate } from "../../util/momentHelper";
import upload from "../../util/Components/FirebaseUpload";

class JobDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      message: "",
      cv_name: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.apply_job = this.apply_job.bind(this);
  }



  componentWillMount() {
    let { authenticated } = this.props;

    if (authenticated) {
      const job_id = window.location.href.split("/")[window.location.href.split("/").length - 1];
      window.location.href = "/app/job_seekers/job-details/" + job_id;
      return;
    }

    window.scrollTo(0, 0);
    this.props.getJobMaverick(this.props.match.params.id);

    if (this.props.departments?.length === 0) {
      this.props.getDepartments({});
    }
  }

  // submit new job request
  handleSubmit = (e) => {
    e.preventDefault();

    const data = this.state;
    data["applied_at"] = createTimeStamp();
    data["applied_at"] = createTimeStamp();
    data["id_job_posts"] = parseInt(this.props.match.params.id);

    // get login user id from token
    const emp_id = jwtDecode(localStorage.getItem("token")).sub;
    data["id_employee"] = emp_id;
    data["id_applicantion_status"] = 1; // [APPLIED]

    // change the filename e.g: "[employee_id]_cv_random_number.pdf"
    const filename = emp_id + "_cv_" + Date.now();
    console.log("thissss: ", process.env.USER_PERSONAL_DOCUMENTS_PATH + `${filename}`);
    // upload to firebase storage
    upload(process.env.USER_PERSONAL_DOCUMENTS_PATH + `${filename}`, this.state.cv_name, data, "cv_name", this.props.applyJob);

    // reset the state and close the modal
    $('#apply_job').modal('hide');
    e.target.reset();
  };

  // handle change inputs
  handleChange(evt) {
    // Prevents React from resetting its properties:
    evt.persist();

    // set the state
    this.setState(state => ({
      ...state,
      [evt.target.name]: evt.target.value
    }));
  }

  apply_job() {
    let { authenticated } = this.props;

    if (!authenticated) {
      //  window.location.href = "/login";
      return;
    }
    else {
      //  $('#apply_job').modal('show'); // Not required as this is no longer where the user applies for the job
    }
  }

  render() {
    // const job = this.props.jobs?.find(job => job.id === parseInt(this.props.match.params.id));
    const job = this.props.job;

    return (
      <div className="main-wrapper" >
        <Helmet>
          <title>Jobs - Utopia Tech PTY LTD</title>
          <meta name="description" content="Login page" />
        </Helmet>

        {/* Header */}
        <div className="header">
          {/* Logo */}
          <div className="header-left">
            <Link to="/app/main/welcome" className="logo">
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
                <a href=";" className="responsive-search">
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
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Jobs</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/app/main/welcome">Dashboard</Link></li>
                    <li className="breadcrumb-item active">Jobs</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <Skeleton loading={this.props.loading} active>
              <div className="row">
                <div className="col-md-8">
                  <div className="job-info job-widget">
                    <h3 className="job-title">{job?.title}</h3>
                    <span className="job-dept">{this.props.departments?.find(department => department.id === job?.dep_id)?.department_name}</span>
                    <ul className="job-post-det">
                      <li><i className="fa fa-calendar" /> Post Date: <span className="text-blue">{timeStampToDate(job?.start_date)}</span></li>
                      <li><i className="fa fa-calendar" /> Closes On: <span className="text-blue">{timeStampToDate(job?.end_date)}</span></li>
                      {/* <li><i className="fa fa-user-o" /> Applications: <span className="text-blue">{job?.applications}</span></li> */}
                      {/* TODO(Umar): Handle view */}
                      {/* <li><i className="fa fa-eye" /> Views: <span className="text-blue">3806</span></li> */}
                    </ul>
                  </div>
                  <div className="job-content job-widget">
                    <div className="job-desc-title"><h4>Job Description</h4></div>
                    <div className="job-description">
                      <p>{job?.desc}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="job-det-info job-widget">
                    <a className="btn job-btn" data-toggle="modal" onClick={this.apply_job}>Apply For This Job</a>
                    <div className="info-list">
                      <span><i className="fa fa-bar-chart" /></span>
                      <h5>Job Type</h5>
                      <p> {job?.type}</p>
                    </div>
                    <div className="info-list">
                      <span><i className="fa fa-money" /></span>
                      <h5>Salary</h5>
                      <p>${job?.min_salary}k - ${job?.max_salary}k</p>
                    </div>
                    <div className="info-list">
                      <span><i className="fa fa-suitcase" /></span>
                      <h5>Experience</h5>
                      <p>{job?.exp_required}</p>
                    </div>
                    <div className="info-list">
                      <span><i className="fa fa-ticket" /></span>
                      <h5>Vacancy</h5>
                      <p>{job?.vaccancy}</p>
                    </div>
                    <div className="info-list">
                      <span><i className="fa fa-map-signs" /></span>
                      <h5>Location</h5>
                      <p>{job?.location}</p>
                    </div>
                    <div className="info-list">
                      <p> {process.env.COMPANY_HR_EMAIL}
                        <br /> {process.env.COMPANY_HR_URL}
                      </p>
                    </div>
                    <div className="info-list text-center">
                      <a className="app-ends" href="#">Application ends in {dateToCounter(job?.end_date)}</a>
                    </div>
                  </div>
                </div>
              </div>
            </Skeleton>
          </div>

          {/* Apply modal  */}
          <div className="modal custom-modal fade" id="apply_job" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Your Details</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <Input name="name" handleChange={this.handleChange} value={this.state.name} type="text">
                      <label>Name <span className="text-danger">*</span></label>
                    </Input>
                    <Input name="email" handleChange={this.handleChange} value={this.state.email} type="email">
                      <label>Email Address <span className="text-danger">*</span></label>
                    </Input>
                    <Input input name="message" handleChange={this.handleChange} value={this.state.message}>
                      <label>Message <span className="text-danger">*</span></label>
                    </Input>
                    <div className="form-group">
                      <label>Upload your CV</label>
                      <div className="custom-file">
                        <input type="file" name="cv_name" onChange={(e) => {
                          e.persist();
                          if (e.target.files[0]) {
                            const fileSize = e.target.files[0].size;
                            const limitSize = 1024 * 1024 * 3;

                            if (fileSize > limitSize) {
                              notification.warning({
                                message: 'Warning!',
                                description: 'The size of file should be less than 3MB.',
                                duration: 5
                              });
                            } else {
                              this.setState(state => ({
                                ...state,
                                [e.target.name]: e.target.files[0]
                              }));
                            }
                          }
                        }} className="custom-file-input" id="cv_upload" required />
                        <label className="custom-file-label" htmlFor="cv_upload">Choose file</label>
                      </div>
                    </div>
                    <Button value="submit" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  job: state.data.job,
  jobs: state.data.jobs,
  departments: state.data.departments,
  loading: state.data.loading,
  authenticated: state.user.authenticated
});

JobDetails.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object
};

const mapActionToProps = {
  getJob,
  getDepartments,
  applyJob,
  getJobMaverick
};

export default connect(mapStateToProps, mapActionToProps)(withRouter(JobDetails));
