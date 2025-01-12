import React, { Component } from "react";
import { connect } from "react-redux";
import "./ComprehensiveService.scss";
import Icon from "../../assets/silder/icongoi-phau-thuat.png"



class ComprehensiveService extends Component {


  render() {
    return (
      <React.Fragment> 
        <div className="List-service">
          <div className="Service-Conten">
            <div className="Service-title">
              <h3>Dịch vụ toàn diện</h3>
            </div>
            <div className="Service-info">

              <div className="Service-item">
                <div className="icon-Service">
                  <img src={Icon}></img>
                </div>
                <div className="Name-Khoa">
                  Khám chuyên Khoa 1
                </div>
              </div>
              <div className="Service-item">
                <div className="icon-Service">
                  <img src={Icon}></img>
                </div>
                <div className="Name-Khoa">
                  Khám chuyên Khoa 2
                </div>
              </div>
              <div className="Service-item">
                <div className="icon-Service">
                  <img src={Icon}></img>
                </div>
                <div className="Name-Khoa">
                  Khám chuyên Khoa 3
                </div>
              </div>
              <div className="Service-item">
               <div className="icon-Service">
                  <img src={Icon}></img>
                </div>

                <div className="Name-Khoa">
                  Khám chuyên Khoa 4
                </div>
              </div>
              <div className="Service-item">
              <div className="icon-Service">
                  <img src={Icon}></img>
                </div>

                <div className="Name-Khoa">
                  Khám chuyên Khoa 5
                </div>
              </div>
              <div className="Service-item">
              <div className="icon-Service">
                  <img src={Icon}></img>
                </div>

                <div className="Name-Khoa">
                  Khám chuyên Khoa 6
                </div>
              </div>
              <div className="Service-item">
              <div className="icon-Service">
                  <img src={Icon}></img>
                </div>

                <div className="Name-Khoa">
                  Khám chuyên Khoa 7
                </div>
              </div>
              <div className="Service-item">
              <div className="icon-Service">
                  <img src={Icon}></img>
                </div>

                <div className="Name-Khoa">
                  Khám chuyên Khoa 8
                </div>
              </div>
              <div className="Service-item">
              <div className="icon-Service">
                  <img src={Icon}></img>
                </div>

                <div className="Name-Khoa">
                  Khám chuyên Khoa 9
                </div>
              </div>
              <div className="Service-item">
              <div className="icon-Service">
                  <img src={Icon}></img>
                </div>

                <div className="Name-Khoa">
                  Khám chuyên Khoa 10
                </div>
              </div>

            </div>
          </div>
        </div>
      </React.Fragment>

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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ComprehensiveService);
