import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { languages, UserRole } from "../../utils/constant";
import { FormattedMessage } from "react-intl";
import _ from 'lodash'


class Header extends Component {

  constructor (props){
    super(props);
    this.state = {
      userInfo: {},
      menu:[]

    }
  }

  componentDidMount(){
    let {userInfo} = this.props
    let menu = []
    if(userInfo && !_.isEmpty(userInfo))
    {
       let idRole = this.props.userInfo.roleId
      if(idRole === UserRole.ADMIN)
      {
        menu = adminMenu
      }
      if(idRole === UserRole.DOCTOR)
        {
          menu = doctorMenu
        }
    }

    this.setState({
      menu: menu
    })
  }


  ChangeLanguage = (language) => {
    console.log("Call change language", language);
    this.props.changlanguagesApp(language)
  }

  render() {
    const { processLogout , userInfo, language} = this.props;
    let {menu} = this.state
   return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          < Navigator menus={menu} />
        </div>
        {/* change Language  */}

        {/* nút logout */}
        <div className="language-logout">
        
          <span className="welcome"><FormattedMessage id="home-header.welcome" />, {userInfo && userInfo.firstName ? userInfo.firstName : ""} !</span>
          <div className="change-language">
            <div className={language === languages.VI ? "language-Vi active" : "language-Vi"}><span onClick={()=>this.ChangeLanguage(languages.VI)}>VI</span></div>
            <div className={language === languages.EN ? "language-En active" : "language-En"}><span onClick={()=>this.ChangeLanguage(languages.EN)}>EN</span></div>
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
    language: state.app.language,
    userInfo: state.user.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changlanguagesApp: (language) => dispatch(actions.changlanguages(language))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
