import React, { Component } from 'react';
import { connect } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./DoctorSchedule.scss"
import * as actions from "../../../store/actions";
import {languages} from '../../../utils/constant'
import ModalBooking from '../../System/ModalBooking'

import moment from "moment";
import "moment/locale/vi"; // Import Tiếng Việt


class DoctorSchedule extends Component {

    constructor(props){
        super(props);
        this.state = {
            scheduleDoctor: [],
            uniqueDates:[],
            slotTimeDoctor: [],
            isOpenModal: false,
            doctorID: this.props.doctorID,
            timeBooking: "",
        }
    }

    componentDidMount() {
        // let doctorID = this.props.doctorID
        this.props.getSchduleDoctorByIdStart(this.state.doctorID)
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

    handleOnclickTime = (time)=>{  
        this.setState({
            isOpenModal: true,
            timeBooking: time})
        
    }
    toggleModal = ()=>{
        // console.log("close modal")
        this.setState({isOpenModal: false})
    }

    render() {
        let {doctorID, uniqueDates,slotTimeDoctor, isOpenModal, timeBooking} = this.state
        let language = this.props.language
        // console.log("slotTimeDoctor: ", slotTimeDoctor)

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
                                            <button 
                                                key={index} className={language === languages.VI ? 'btn-time btn-VN' : 'btn-time btn-EN' }  
                                                onClick={()=>{this.handleOnclickTime(item)}}>
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
                </div>
                <div className='Modal-booking'>
                    <ModalBooking
                        isOpenModal = {isOpenModal}
                        toggleModal = {()=>{this.toggleModal()}}
                        doctorID = {doctorID}
                        timeBooking = {timeBooking}
                    />
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
