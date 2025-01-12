import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import specialtyImg from "../../../assets/silder/logo-y-duoc-1.jpg"

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {


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

      <div className="Section-MedicalFacility">
        <div className="MedicalFacility-Title">
          <h2>Cơ sở Y tế</h2>
          <div className="XemThem">Xem thêm</div>
        </div>
        
        <div className="MedicalFacility-Slider">
          <Slider {...settings}>
            <div className="Spl-Slider-item">
                <div className="spl-Slier-conten">
                    <div className="icon-facility">
                        <img src={specialtyImg}></img>
                    </div>
                  <h3>Biện viện 1</h3>
                </div>
            </div>
            <div className="Spl-Slider-item">
                <div className="spl-Slier-conten">
                <div className="icon-facility">
                    <img src={specialtyImg}></img>
                </div>
                  <h3>Biện viện 2</h3>
                </div>
            </div>
            <div className="Spl-Slider-item">
                <div className="spl-Slier-conten">
                <div className="icon-facility">
                    <img src={specialtyImg}></img>
                </div>
                  <h3>Biện viện 3</h3>
                </div>
            </div>
            <div className="Spl-Slider-item">
                <div className="spl-Slier-conten">
                <div className="icon-facility">
                    <img src={specialtyImg}></img>
                </div>
                  <h3>Biện viện 4</h3>
                </div>
            </div>
            <div className="Spl-Slider-item">
                <div className="spl-Slier-conten">
                <div className="icon-facility">
                    <img src={specialtyImg}></img>
                </div>
                  <h3>Biện viện 5</h3>
                </div>
            </div>
            <div className="Spl-Slider-item">
                <div className="spl-Slier-conten">
                <div className="icon-facility">
                    <img src={specialtyImg}></img>
                </div>
                  <h3>Biện viện 6</h3>
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
      className={`${className} btn-slider-facility btn-next-facility`} // Thêm class tùy chỉnh "btn-next"
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
      className={`${className} btn-slider-facility btn-prev-facility`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >Prev </button>
  );
};
// ***********************************************************


const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
