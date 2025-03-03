import React, { Component } from 'react';
import { connect } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./DoctorSchedule.scss"
import * as actions from "../../../store/actions";
import {languages} from '../../../utils/constant'

import moment from "moment";
import "moment/locale/vi"; // Import Tiếng Việt


class DoctorSchedule extends Component {

    constructor(props){
        super(props);
        this.state = {
            scheduleDoctor: [],
            uniqueDates:[],
            slotTimeDoctor: [],
        }
    }

    componentDidMount() {
        let doctorID = this.props.doctorID
        this.props.getSchduleDoctorByIdStart(doctorID)
    }

    componentDidUpdate(prevProps){
        if(prevProps.scheduleDoctor !== this.props.scheduleDoctor)
        {
            let uniqueDates = [...new Set(this.props.scheduleDoctor.map(item => item.date))]
            this.setState({
                scheduleDoctor:this.props.scheduleDoctor,
                uniqueDates: uniqueDates,
            }, ()=>{
                // console.log("call back didupdate")
                this.OnchangSelect({target: {value: uniqueDates[0]}})
            })
        }

    }

    formatDate (inputDate){
        let date = moment(inputDate, ["DD/MM/YYYY", moment.ISO_8601], true);

        if (moment().isSame(date, "day")) {
            return {
                vietnamese: "Hôm nay",
                english: "Today"
            };
        }
        return {
            vietnamese: moment(date).locale("vi").format("dddd - D/M"),
            english: moment(date).locale("en-gb").format("ddd - D/M") 
        };
    }


    OnchangSelect =  (event) => {
        let targetDate = event.target.value?.split('T')[0]
        // console.log("targer date onchang select: ",targetDate)
        let {scheduleDoctor} =this.state
        let result = scheduleDoctor.filter(item => item.date.split('T')[0] === targetDate);
        this.setState({
            slotTimeDoctor: result
        })
    }


    render() {
        let {uniqueDates,slotTimeDoctor} = this.state
        let language = this.props.language

        return (
            <React.Fragment>
                <div className='Doctor-Schedule-content'>
                    <div className='Doctor-Schedule-Left'>
                        <div className='Doctor-Schedule mb-2'>
                            <select 
                                className="form-select Doctor-Schedule-select" 
                                aria-label="Default select example"
                                onChange={(event) => {this.OnchangSelect(event)} }
                                // value={language === languages.Vi?this.formatDate(selectDate).vietnamese:this.formatDate(selectDate).english}
                                >    

                                {                                  
                                    uniqueDates?.length > 0 ? uniqueDates.map((item, index) => {
                                        return(
                                            <option key={index} value={item}>{this.formatDate(item).vietnamese}</option>
                                        )
                                    }): <option>Lịch trống</option>
                                }

                            </select>
                        </div>
                        <div className='appointment-doctor'>
                            <span><i className="fa-solid fa-calendar-days mb-3"></i> Lịch Khám</span>
                            <div className='time-appointment'>
                                {
                                    slotTimeDoctor && slotTimeDoctor.length > 0 ? slotTimeDoctor.map ((item, index) =>{
                                        return (
                                            <button key={index} className='time'>
                                                {language === languages.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}     
                                            </button>
                                        )
                                    } ) : <p >Bác sĩ không có lịch khám . Vui Lòng quây lại sau</p>
                                }
                                {/* <button className='time'>07:30 - 08:00</button>
                                <button className='time'>07:30 - 08:00</button>
                                <button className='time'>07:30 - 08:00</button>
                                <button className='time'>07:30 - 08:00</button>
                                <button className='time'>07:30 - 08:00</button>
                                <button className='time'>07:30 - 08:00</button> */}

                            </div>
                        </div>
                            <span className='mt-5'>Chọn <i className="fa-regular fa-hand-point-up"></i>  và đặt(Phí đặt 0đ)</span>
                    </div>

                    <div className='local-clinic'>
                            <div className='address-doctor'>
                                <h2>Địa chỉ khám</h2>
                                <div className='title-address'>Bệnh Viên Tâm Anh</div>
                                <div className='address'>123 hoàng văn thụ</div>
                            </div>
                            <div className='clinic-price'>
                                <div className='title-price'>Giá Khám: </div>
                                <div className='price'> 350.000 đ </div>
                                <div className='detail-clinic'> xem chi tiết </div>
                            </div>
                            <div className='underwrite'>
                                <div className='title-underwrite'>Loại bảo hiểm áp dụng</div>
                                <div className='detail-underwrite'>xem chi tiết</div>
                            </div>
                        </div>
                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        scheduleDoctor: state.doctor.scheduleDoctor,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSchduleDoctorByIdStart: (id) => dispatch(actions.getSchduleDoctorByIdStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
