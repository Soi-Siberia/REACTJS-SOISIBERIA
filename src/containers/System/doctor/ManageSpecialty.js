import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss'

import * as actions from '../../../store/actions'
import Select from 'react-select';


class ManageSpecialty extends Component {

    constructor (props){
        super (props);
        this.state = {
            alldoctor: [],
            roleTimeDoctor: [],
            dateSelect:"",
            currentDate: new Date().toISOString().split("T")[0],
        }
    }

    componentDidMount(){
        this.props.getallDoctor()
        this.props.fatchRoleDoctorStart()
    }
    componentDidUpdate(prevPops){
        if(prevPops.dataAllDoctor !== this.props.dataAllDoctor)
        {
            let options = this.optionSelectDoctor(this.props.dataAllDoctor)
            this.setState({
                alldoctor: options
            })
        }

        if(prevPops.roleTimeDoctor !== this.props.roleTimeDoctor)
        {
            this.setState({
                roleTimeDoctor: this.props.roleTimeDoctor
            })
        }

    }

    optionSelectDoctor = (data) =>{
        return data?.map((item,index) => ({
            value: item.id,
            label: `${item.lastName} ${item.firstName}`
        })) || [];
      }

    handleChangeSelect = (selectedOption)=>{
        this.setState({
            selectedOption
        })
    }

    formatDate = (isoDate) => {
        console.log("Giá trì isoDate", isoDate)
        if (!isoDate) return ""; // Kiểm tra nếu rỗng
        const [year, month, day] = isoDate.split("-"); // Tách chuỗi YYYY-MM-DD
        return `${day}/${month}/${year}`; // Format lại thành dd/MM/YYYY
      };
    handleOnchangDate = (event) =>{
        let date = this.formatDate(event.target.value)
        console.log("Onchang date: ", date, "và : ",event.target.value)

        this.setState({
            currentDate: event.target.value,
            dateSelect: date
        })

    }

    render() {

        let {alldoctor,selectedOption, roleTimeDoctor,currentDate} = this.state
        // console.log("roleTimeDoctor: ", roleTimeDoctor)
        return (
            <React.Fragment>
                <div className='manage-specialty'>
                    <div className='container manage-specialty-container'>
                        <div className='tilte text-center mt-4'>
                            <h3 className='text-center'>QUẢN LÝ KẾ HOẠCH KHÁM CỦA BÁC SĨ</h3>
                        </div>
                        <div className='schedule-management-content row'>
                            <div className='schedule-management_controls my-4 col-12 col-md-6'>
                                <label className='schedule-management_lable my-2'>Chọn bác sĩ</label>
                                    <Select
                                    value={selectedOption}
                                    onChange={this.handleChangeSelect}
                                    options={alldoctor}
                                />
                            </div>
                            



                            <div className='schedule-management_date my-4 col-12 col-md-6'>
                                <label className='schedule-management_lable my-2'>Chọn Ngày</label>
                                <input className='schedule-management_input form-control' 
                                type='date' 
                                min={new Date().toISOString().split('T')[0]}
                                onKeyDown={(e)=>e.preventDefault()}
                                onClick={(e)=> e.target.showPicker()}
                                onChange={(event)=>{this.handleOnchangDate(event)}}
                                value={currentDate}
                                ></input>
                            </div>
                        </div>
                        <div className='schedule-management-time-Slots row text-center'>
                            {
                                roleTimeDoctor && roleTimeDoctor.length > 0 && roleTimeDoctor.map((item, index) => {
                                    return(
                                        <button key={index} className='item-time-slot col-md-1'>{item.valueVi}</button>
                                    )

                                })
                            }
                        </div>

                        <div className='schedule-management-btn-Save mt-4 btn-group' >
                            <button className='btn btn-Save' >Lưu Thông Tin</button>
                        </div>
                    </div>


                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        dataAllDoctor: state.admin.dataAllDoctor,
        roleTimeDoctor: state.admin.roleTimeDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getallDoctor: () => dispatch(actions.getAllDoctorStart()),
        fatchRoleDoctorStart: ()=> dispatch(actions.fatchRoleDoctorStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
