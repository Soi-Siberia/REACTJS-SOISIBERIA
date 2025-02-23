import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss'

import * as actions from '../../../store/actions'
import Select from 'react-select';

import  {toast}  from 'react-toastify';


class ManageSpecialty extends Component {

    constructor (props){
        super (props);
        this.state = {
            alldoctor: [],
            selectedOption: "",
            roleTimeDoctor: [],
            currentDate: new Date().toISOString().split("T")[0],
            dateSelect: ""
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
            // let data = this.props.roleTimeDoctor
            // data && data.length > 0 && data.map((item) => {
            //     item.isSelect = false
            //     return item
            // })
            // // console.log("Data add select: ", data)
            // this.setState({
            //     roleTimeDoctor: data
            // })
                let data = this.props.roleTimeDoctor
                ? this.props.roleTimeDoctor.map((item) => ({
                    ...item, // Sao chép toàn bộ thuộc tính của item
                    isSelect: false, // Gán lại giá trị
                }))
                : [];
        
            this.setState({
                roleTimeDoctor: data,
            });
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
        // console.log("Giá trì isoDate", isoDate)
        if (!isoDate) return ""; // Kiểm tra nếu rỗng
        const [year, month, day] = isoDate.split("-"); // Tách chuỗi YYYY-MM-DD
        return `${day}/${month}/${year}`; // Format lại thành dd/MM/YYYY
      };

    
    handleOnchangDate = (event) =>{
        // let date = this.formatDate(event.target.value)
        console.log("Onchang date: ",event.target.value)

        this.setState({
            // currentDate: event.target.value,
            dateSelect: event.target.value,
        })

        
    }

    toggleButton = (time)=>{

        if (!time || !time.id) {
            console.error("LỖI: time hoặc time.id bị undefined", time);
            return;
          }
        
          this.setState((prevState) => {
            if (!Array.isArray(prevState.roleTimeDoctor) || prevState.roleTimeDoctor.length === 0) {
              console.warn("roleTimeDoctor đang rỗng, không có gì để cập nhật");
              return null; // Không cập nhật state nếu không có dữ liệu
            }
        
            let newRoleTimeDoctor = prevState.roleTimeDoctor.map((item) => {
              if (!item) {
                console.error("LỖI: item bị undefined trong map()");
                return item; // Tránh lỗi spread (...item)
              }
              return item.id === time.id ? { ...item, isSelect: !item.isSelect } : item;
            });
        
            return { roleTimeDoctor: newRoleTimeDoctor };
          });
    }

    handleSaveSpecialty = ()=>{
        let { selectedOption, roleTimeDoctor, dateSelect} = this.state ?? {}
        let timeSelect = roleTimeDoctor?.filter(item => item.isSelect)

        if (!selectedOption || !dateSelect || !timeSelect.length) {
            return toast.success(
                !selectedOption ? "Chưa chọn bác sĩ !!!" :
                !dateSelect ? "Chưa chọn ngày bác sĩ khám !!!" :
                "Chưa chọn thời gian lịch khám bác sĩ !!!"
            );
        }

        let formateData = new Date(dateSelect).getTime();
        // console.log("formateData = ",formateData)

        let data = timeSelect && timeSelect.length > 0 && timeSelect.map((item) => ({
            doctorId: selectedOption.value,
            date: formateData,
            timeType: item.keyMap
        })) 
        // console.log("Save data", dateSelect)

        this.props.bulkCreateSheduleStart(data)
    }


    render() {

        let {alldoctor,selectedOption, roleTimeDoctor } = this.state
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
                                ></input>
                            </div>
                        </div>
                        <div className='schedule-management-time-Slots row text-center'>
                            {
                                roleTimeDoctor && roleTimeDoctor.length > 0 && roleTimeDoctor.map((item, index) => {
                                    return(
                                        <button 
                                            key={index} 
                                            // className='item-time-slot col-md-1'
                                            className={item.isSelect === true ? "item-time-slot col-md-1 active" : "item-time-slot col-md-1"}
                                            onClick={()=> this.toggleButton(item)}>{item.valueVi}</button>
                                    )

                                })
                            }
                        </div>

                        <div className='schedule-management-btn-Save mt-4 btn-group' >
                            <button 
                                className='btn btn-Save'
                                onClick={()=>this.handleSaveSpecialty()}
                            >Lưu Thông Tin</button>
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
        fatchRoleDoctorStart: ()=> dispatch(actions.fatchRoleDoctorStart()),
        bulkCreateSheduleStart: (data) => dispatch(actions.bulkCreateSheduleStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
