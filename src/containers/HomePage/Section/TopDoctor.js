import React, { Component } from "react";
import { connect } from "react-redux";
// import "./TopDoctor.scss";
import Slider from "react-slick";
import specialtyImg from "../../../assets/silder/logo-y-duoc-1.jpg";
import "./Section.scss";
import "./TopDoctor.scss";

//actions redux
import * as actions from "../../../store/actions"


// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class TopDoctor extends Component {

  constructor (props){
    super(props);
    this.state = {
      TopDoctor: {}
    }
  }
  componentDidMount(){

    this.props.getTopDoctorStartRedux()

  }

  componentDidUpdate(prevPops, prevState,snapshot){
    if(prevPops.topDoctorRedux !== this.props.topDoctorRedux)
    {
      this.setState({
        TopDoctor: this.props.topDoctorRedux.data
    })
    }
  }

 


  render() {
    let {TopDoctor} = this.state
    console.log("Top doctor redux : ", TopDoctor)

    let settings = {
      focusOnSelect: true,
      infinite: true,
      // slidesToShow: 2,
      slidesToShow: TopDoctor && TopDoctor.length ? Math.min(TopDoctor.length, 3) : 2,
      slidesToScroll: 1,
      speed: 500,
      nextArrow: <CustomNextArrow />, // Thêm nút tùy chỉnh cho "Next"
      prevArrow: <SamplePrevArrow /> // Thêm nút tùy chỉnh cho "Prev"
    };




    return (
      <div className="Section Section-Top-Doctor">

        <div className="Section-Title">
          <h2>Bác sĩ nổi bật</h2>
          <div className="XemThem">Xem thêm</div>
        </div>
        
        <div className="Section-Slider">
          <Slider {...settings}>
            
            {
              TopDoctor && TopDoctor.length && TopDoctor.map((item, index) => {
                let imagebase64 = ''
                  if(item.avatar)
                  {
                      imagebase64 = new Buffer(item.avatar, 'base64').toString('binary');
                  }
                return(
                  <div key={index} className="Section-Slider-item">
                    <div className="Section-Slier-conten">
                        <div className="icon-Section-Slider icon-TopDoctor-Slider">
                            {/* <img src={specialtyImg} alt=""></img> */}
                            <img src={imagebase64 ? imagebase64 : specialtyImg} alt="" />

                        </div>
                      <div className="info-Section-Slider text-center py-3">
                        <h3>{ `${item.positionData.valueVi} ${item.firstName} ${item.lastName}` }</h3>
                        <span>Da liễu</span>
                      </div>
                    </div>
                  </div>
                )
              })
            }

            {/* <div className="Section-Slider-item">
                <div className="Section-Slier-conten">
                    <div className="icon-Section-Slider icon-TopDoctor-Slider">
                        <img src={specialtyImg} alt=""></img>
                    </div>
                  <div className="info-Section-Slider text-center py-3 text-center py-3">
                    <h3>Bác sĩ chuyên khoa II Trần Thị Hoài Hương</h3>
                    <span>Da liễu</span>
                  </div>
                </div>
            </div>
            <div className="Section-Slider-item">
                <div className="Section-Slier-conten">
                    <div className="icon-Section-Slider icon-TopDoctor-Slider">
                        <img src={specialtyImg} alt=""></img>
                    </div>
                  <div className="info-Section-Slider text-center py-3">
                    <h3>Bác sĩ chuyên khoa II Trần Thị Hoài Hương</h3>
                    <span>Da liễu</span>
                  </div>
                </div>
            </div>
            <div className="Section-Slider-item">
                <div className="Section-Slier-conten">
                    <div className="icon-Section-Slider icon-TopDoctor-Slider">
                        <img src={specialtyImg} alt=""></img>
                    </div>
                  <div className="info-Section-Slider text-center py-3">
                    <h3>Bác sĩ chuyên khoa II Trần Thị Hoài Hương</h3>
                    <span>Da liễu</span>
                  </div>
                </div>
            </div>
            <div className="Section-Slider-item">
                <div className="Section-Slier-conten">
                    <div className="icon-Section-Slider icon-TopDoctor-Slider">
                        <img src={specialtyImg} alt=""></img>
                    </div>
                  <div className="info-Section-Slider text-center py-3">
                    <h3>Bác sĩ chuyên khoa II Trần Thị Hoài Hương</h3>
                    <span>Da liễu</span>
                  </div>
                </div>
            </div> */}
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
    topDoctorRedux: state.doctor.doctorTop,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopDoctorStartRedux: () => dispatch(actions.getTopDoctorStart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopDoctor);
