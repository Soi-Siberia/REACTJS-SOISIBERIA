import React, { Component } from 'react';
import { connect } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import * as actions from "../../../store/actions";
// import {languages} from '../../../utils/constant'
import './ProfileDoctor.scss'

class ProfileDoctor extends Component {

    constructor(props){
        super(props);
        this.state = {
            timeString : "",
        }
    }

    componentDidMount() {
        this.TimeStringFormat()
    }

    componentDidUpdate(prevProps){
        if(prevProps.timeBooking !== this.props.timeBooking)
        {
            this.TimeStringFormat()
        }
    }

    DateFormater = (date) => {
        let validDate = new Date(date)
        let formatter = new Intl.DateTimeFormat('vi-VN', { 
            weekday: 'long', 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        });
        return formatter.format(validDate).replace(",", " -")
    }

    TimeStringFormat = () =>{
        let timeBooking = this.props.timeBooking
        let stringtimeformatter = `${timeBooking.timeTypeData.valueVi} - ${this.DateFormater(timeBooking.date)}`
        this.setState({
            timeString: stringtimeformatter
        })
        this.props.handleGetDataChild(stringtimeformatter)
        return stringtimeformatter
    }


    render() {
        let timeString = this.state.timeString
        let{inforDoctor} = this.props
        // console.log("timeBooking 123123", timeBooking)
        return (
            <>
                <div className='container-full'>
                    <div className='container'>
                        <div className='row'>
                            <div className='profile-left col-2'>
                                <div className='profile-avatar' style={{backgroundImage:`url(${inforDoctor.avatar})`}}>
                                </div>
                            </div>

                            <div className='profile-right col-10'>
                                <div className='profile-name'>
                                    {
                                        inforDoctor && inforDoctor.positionData ? 
                                        `${inforDoctor.positionData.valueVi} ${inforDoctor.lastName} ${inforDoctor.firstName}`
                                        : "Chưa có thông tin bác sĩ"
                                    }
                                </div>
                                
                                <div className='profile-time-booking'>
                                    <i className="fa fa-calendar profile-icon" aria-hidden="true"></i>
                                    <div className='time-booking'>{timeString}</div>
                                </div>
                                <div className='profole-address'>
                                    <i className="fa fa-home profile-icon-address" aria-hidden="true"></i>
                                    <div className='name-clinic'>
                                        {
                                            inforDoctor?.doctor_infor?.nameClinic ?? "đang cập nhật"
                                        }
                                    </div>
                                    <div className='addres-clinic'>
                                        {
                                            inforDoctor?.doctor_infor?.addressClinic ?? "đang cập nhật"
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
