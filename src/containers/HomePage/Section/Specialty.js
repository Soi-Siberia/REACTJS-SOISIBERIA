import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import specialtyImg from "../../../assets/silder/tim-mach.png"
import "./Section.scss";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";

import { withRouter } from "react-router-dom";  // 🟢 Thêm

class Specialty extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // state here
      allSpecialty:[]
    };
  }

  componentDidMount() {
    this.props.getAllSpecialtyStart();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.allSpecialty !== this.props.allSpecialty) {
      // Handle any changes to allSpecialty here if needed
      this.setState({
        allSpecialty: this.props.allSpecialty
      })
    }
  }

  clickDetailSpecialty = (item) => {
    console.log("clickDetailSpecialty", item)
    this.props.history.push(`/detail-specialty/${item.id}`); // 🟢 Thêm: dùng history từ props
  }

  render() {

    let { allSpecialty } = this.state;
    // console.log("allSpecialty", allSpecialty)
    let settings = {
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
            {allSpecialty && allSpecialty.length > 0 &&
              allSpecialty.map((item, index) => {
                let imagebase64 = item.image
                  ? new Buffer(item.image, "base64").toString("binary")
                  : specialtyImg;

                return (
                  <div className="Spl-Slider-item" key={index}>
                    <div className="spl-Slier-conten">
                      <img src={imagebase64} alt=""></img>
                      <h3 onClick={()=> this.clickDetailSpecialty(item)}>{item.name}</h3>
                    </div>
                  </div>
                )
              })
            }
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
    language: state.app.language,
    allSpecialty: state.doctor.allSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSpecialtyStart: () => dispatch(actions.getAllSpecialtyStart()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty)); // 🟢 Thêm
