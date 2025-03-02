import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";  // 🟢 Thêm
import Slider from "react-slick";
import specialtyImg from "../../../assets/silder/logo-y-duoc-1.jpg";
import "./Section.scss";
import "./TopDoctor.scss";
import * as actions from "../../../store/actions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class TopDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TopDoctor: [],
    };
  }

  componentDidMount() {
    this.props.getTopDoctorStartRedux();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
      this.setState({
        TopDoctor: this.props.topDoctorRedux.data || [],  // 🟢 Thêm: tránh lỗi undefined
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);  // 🟢 Thêm: dùng history từ props
    // console.log("Doctor view detail: ", doctor);
  };

  render() {
    let { TopDoctor } = this.state;
    let settings = {
      focusOnSelect: true,
      infinite: false,
      slidesToShow: TopDoctor.length ? Math.min(TopDoctor.length, 4) : 2,
      slidesToScroll: 1,
      speed: 500,
      nextArrow: <CustomNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    // console.log("TopDoctor",TopDoctor)
    return (
      <div className="Section Section-Top-Doctor">
        <div className="Section-Title">
          <h2>Bác sĩ nổi bật</h2>
          <div className="XemThem">Xem thêm</div>
        </div>

        <div className="Section-Slider">
          <Slider {...settings}>
            {TopDoctor.length > 0 &&  // 🟢 Thêm: Kiểm tra trước khi .map()
              TopDoctor.map((item, index) => {
                let imagebase64 = item.avatar
                  ? new Buffer(item.avatar, "base64").toString("binary")
                  : specialtyImg;

                return (
                  <div key={index} className="Section-Slider-item">
                    <div className="Section-Slier-conten">
                      <div className="icon-Section-Slider icon-TopDoctor-Slider">
                        <img src={imagebase64} alt="" />
                      </div>
                      <div
                        className="info-Section-Slider text-center py-3"
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <h3>{`${item.positionData.valueVi} ${item.lastName} ${item.firstName}`}</h3>
                        <span>Da liễu</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    );
  }
}

// Custom next arrow
const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} btn-slider-facility btn-next-facility`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      Next
    </button>
  );
};

// Custom previous arrow
const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} btn-slider-facility btn-prev-facility`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      Prev
    </button>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorRedux: state.doctor.doctorTop,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopDoctorStartRedux: () => dispatch(actions.getTopDoctorStart()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopDoctor)); // 🟢 Thêm: bọc withRouter
