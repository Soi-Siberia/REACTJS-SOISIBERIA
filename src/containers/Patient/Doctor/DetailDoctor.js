import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./DetailDoctor.scss"
import * as actions from "../../../store/actions";
import DoctorSchedule from '../Doctor/DoctorSchedule'
import DoctorExtra from '../Doctor/DoctorExtra';




class DetailDoctor extends Component {

    constructor(props){
        super(props);
        this.state = {
            doctorDetail: [],
            idDoctor: this.props.match?.params?.id || " "
        }
    }

    componentDidMount() {
        this.props.getDetailDoctorRedux(this.state.idDoctor);
        
      }
    
    componentDidUpdate(prevProps){
        if(prevProps.detailtDoctor !== this.props.detailtDoctor)
        {
            this.setState({
                doctorDetail: this.props.detailtDoctor
            })
        }
    }


    render() {
        let {idDoctor} = this.state
        let detailDoctor = this.state.doctorDetail?.data || {}
        // console.log("detailDoctor: ", detailDoctor)
        return (
            <React.Fragment>
                <HomeHeader />
                <div className='container detai-doctor-container'>
                    <div className='detai-info'>
                        <div className='avatar-doctor'>
                            <img src={detailDoctor.avatar} alt='avatar'></img>
                        </div>
                        <div className='content-infor'>
                        <h1>
                            {(detailDoctor.positionData?.valueVi || "") + " " + 
                            (detailDoctor.lastName || "") + " " + 
                            (detailDoctor.firstName || "")}
                        </h1>
                            <div className='description'>{
                                    detailDoctor?.markDown?.description
                                }
                            </div>
                            <div className='location-doctor mt-2'>
                                <i className="fa-solid fa-location-dot"></i>
                                <span className='ms-3'>{detailDoctor.address || "Bác sĩ chưa cập nhật"}</span>
                            </div>
                            <div className='social-doctor mt-2'>
                                <div className='social'>
                                    <i className="fa-solid fa-thumbs-up"></i>
                                    <span className='ms-1'>Thích</span>
                                </div>
                                <div className='social'>
                                    <i className="fa-solid fa-share"></i>
                                    <span className='ms-1'>Chia sẻ</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    
                    <div className='doctor-contact'>
                        <div className='contact-lichkham'>
                            <DoctorSchedule
                                doctorID = {idDoctor}
                                // detailDoctor = {detailDoctor.doctor_infor}
                            />
                        </div>
                        <div className='contact-chitiet'>
                            <DoctorExtra
                                doctorID = {idDoctor}
                                // detailDoctor = {detailDoctor.doctor_infor}
                            />
                        </div>


                        
                    </div>

                </div>
                <div className='description-doctor'>
                    <div className='container description-content' dangerouslySetInnerHTML={{__html: detailDoctor?.markDown?.contentHTML || "<p> Đang cập nhật .... </p>"}} />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        detailtDoctor: state.doctor.detailDoctor
        
    };
};

const mapDispatchToProps = dispatch => {
    return {

        getDetailDoctorRedux: (id) => dispatch(actions.getDetailDoctorByIdStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
