import React, { Component } from "react";
// import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import "./HomeHeader.scss";

class HomeHeader extends Component {
  render() {
    return (
      <div className="Home-Header-Container">
        <div className="Home-Header-Content">
          <div className="Header-Content-Left">
            <i className="fa fa-bars fa-3x" aria-hidden="true"></i>
            <div className="Header-logo"></div>
            <div className="logo-text">BookingCare</div>
          </div>
          <div className="Header-Content-center">
            <div className="Header-Content-center-item">
              <span>Tất cả</span>
            </div>
            <div className="Header-Content-center-item">
              <span>Tại nhà</span>
            </div>
            <div className="Header-Content-center-item">
              <span>Tại viện</span>
            </div>
            <div className="Header-Content-center-item">
              <span>Sống khỏe</span>
            </div>
            <div className="Content-Search">
              <input type="text" placeholder="Search...." />
              <i className="fa fa-search" aria-hidden="true"></i>
            </div>
          </div>
          <div className="Header-Content-right">
            <div className="right-deal">
              <div className="icon-deal"></div>
              <span>Hợp tác</span>
            </div>
            <div className="right-clock">
              <div className="icon-clock"></div>
              <span>Lịch hẹn</span>
            </div>
            <div className="language">
              <div className="icon-vi"></div>
              <span>Ngôn ngữ</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
