import React, { Component } from "react";
// import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import ComprehensiveService from "./ComprehensiveService";
import MedicalFacility from "./Section/MedicalFacility";
import MediaSection from "./Section/MediaSection";
import TopDoctor from "./Section/TopDoctor";
import BannerHome from "./Banner/BannerHome"
class HomePage extends Component {
  render() {
    return(
      <React.Fragment>
        <HomeHeader />
        <BannerHome />
        <ComprehensiveService />
        <Specialty />
        <TopDoctor />
        <MedicalFacility />
        <MediaSection />

        <div style={{height: 300}}></div>
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
