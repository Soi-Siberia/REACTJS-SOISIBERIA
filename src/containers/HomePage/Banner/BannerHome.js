import React, { Component } from "react";
// import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import "./BannerHome.scss"
// import { FormattedMessage } from "react-intl";

// Cấu hình ngôn ngữ
// import {languages} from "../../utils/constant";// định nghĩa ngôn ngữ 
// import { changlanguages } from "../../store/actions/appActions";// hàm thay đổi ngôn ngữ


class BannerHome extends Component {
  render() {
    return (
      // console.log("this props: ", this.props.language),
      <React.Fragment>
        <div className="Home-header-banner">
          <div className="banner-title">
            <h1>Nơi khởi nguồn sức khỏe</h1>
          </div>
          <div className="banner-search-ai">
            <div className="search-ai">
              <input type="text" placeholder="Đặt câu hỏi cho trợ lý AI" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" preserveAspectRatio="none"fill="#cac3ad"><path d="M81.9 27.8C47.1 12.7 12.8 50.1 30.8 83.5l69.3 128.8c4.4 8.3 12.6 13.8 21.9 15l176 22c3.4.4 6 3.3 6 6.7s-2.6 6.3-6 6.7l-176 22c-9.3 1.2-17.5 6.8-21.9 15L30.8 428.5c-18 33.4 16.3 70.8 51.1 55.7l441.9-191.5c32.1-13.9 32.1-59.5 0-73.4z"></path></svg>
            </div>
            <div className="top-search">
              <div className="icon-top-search"></div>
              <span>Hỏi đáp nhanh bệnh viện top đầu</span>
            </div>
          </div>
          <div className="ai-question">
              <div className="question">
                <span>Chẩn đoán xơ gan khác và không đặc hiệu (Xơ gan childC - Báng bụng lượng vừa) thì nên đăng kí khám khoa nào ở Bệnh viện Chợ Rẫy?</span>
                <div className="icon-question"> + </div>
              </div>
              <div className="question">
                <span>Khoa Thận - Lọc máu Bệnh viện Hữu nghị Việt Đức nhận khám những bệnh gì?</span>
                <div className="icon-question"> + </div>
              </div>
              <div className="question">
                <span>Đăng ký khám tại Bệnh viện Bạch Mai cần mang theo giấy tờ gì?</span>
                <div className="icon-question"> + </div>
              </div>
              <div className="question">
                <span>Cách đặt lịch khám tại Bệnh viện Lão Khoa Trung Ương</span>
                <div className="icon-question"> + </div>
              </div>
              <div className="question">
                <span>Cách đặt lịch khám tại Bệnh viện Từ Dũ</span>
                <div className="icon-question"> + </div>
              </div>
              <div className="question">
                <span>Địa chỉ Bệnh viện Nhân dân 115</span>
                <div className="icon-question"> + </div>
              </div>
            </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerHome);
