import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { languages } from "../../utils/constant";

class Header extends Component {

  ChangeLanguage = (language) => {
    // console.log("Call change language", language);
    this.props.changlanguagesApp(language)
  }

  render() {
    const { processLogout } = this.props;
    console.log("this.props.language: ",this.props.language);
    return (
      
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>
        {/* change Language  */}

        {/* nút logout */}
        <div className="language-logout">
          <div className="change-language">
            <div className={this.props.language === languages.VI ? "language-Vi active" : "language-Vi"}><span onClick={()=>this.ChangeLanguage(languages.VI)}>VI</span></div>
            <div className={this.props.language === languages.EN ? "language-En active" : "language-En"}><span onClick={()=>this.ChangeLanguage(languages.EN)}>EN</span></div>
          </div>

          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
          </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changlanguagesApp: (language) => dispatch(actions.changlanguages(language))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
