import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import specialtyImg from "../../../assets/silder/tim-mach.png"

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {


  render() {
    const settings = {
      focusOnSelect: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 500,
      nextArrow: <CustomNextArrow />, // Thêm nút tùy chỉnh cho "Next"
      prevArrow: <SamplePrevArrow /> // Thêm nút tùy chỉnh cho "Prev"
    };
    return (

      <div className="Section-Specialty">
        <div className="Specialty-Title">
          <h2>Chuyên khoa</h2>
          <div className="XemThem">Xem thêm</div>
        </div>
        
        <div className="Specialty-Slider">
          <Slider {...settings}>
            <div className="Spl-Slider-item">
                <div className="spl-Slier-conten">
                  <img src={specialtyImg} alt=""></img>
                  <h3>Tim mạch 1</h3>
                </div>
            </div>
            <div className="Spl-Slider-item">
                <div className="spl-Slier-conten">
                  <img src={specialtyImg} alt=""></img>
                  <h3>Tim mạch 2</h3>
                </div>
            </div>
            <div className="Spl-Slider-item">
                <div className="spl-Slier-conten">
                  <img src={specialtyImg} alt=""></img>
                  <h3>Tim mạch 3</h3>
                </div>
            </div>
            <div className="Spl-Slider-item">
                <div className="spl-Slier-conten">
                  <img src={specialtyImg} alt=""></img>
                  <h3>Tim mạch 4</h3>
                </div>
            </div>
            <div className="Spl-Slider-item">
                <div className="spl-Slier-conten">
                  <img src={specialtyImg} alt=""></img>
                  <h3>Tim mạch 5</h3>
                </div>
            </div>
            <div className="Spl-Slider-item">
                <div className="spl-Slier-conten">
                  <img src={specialtyImg} alt=""></img>
                  <h3>Tim mạch 6</h3>
                </div>
            </div>
          </Slider>
        </div>

      </div>
      
    );
  }
}



// custom next arrow for slider specialty
const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} btn-slider-specialty btn-next-specialty`} // Thêm class tùy chỉnh "btn-next"
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      Next
    </button>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} btn-slider-specialty btn-prev-specialty`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >Prev </button>
  );
};
// ***********************************************************


const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
