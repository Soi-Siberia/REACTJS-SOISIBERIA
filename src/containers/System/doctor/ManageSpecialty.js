import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss'

class ManageSpecialty extends Component {


    render() {
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
                                <select class=" schedule-management_controls form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            </div>
                            



                            <div className='schedule-management_date my-4 col-12 col-md-6'>
                                <label className='schedule-management_lable my-2'>Chọn Ngày</label>
                                <input className='schedule-management_input form-control' 
                                type='date' 
                                min={new Date().toISOString().split('T')[0]}
                                onKeyDown={(e)=>e.preventDefault()}
                                onFocus={(e)=> e.target.showPicker()}></input>
                            </div>
                        </div>
                        <div className='schedule-management-time-Slots row text-center'>
                            <div className='item-time-slot col-md-1'>8:00-9:00</div>
                            <div className='item-time-slot col-md-1'>9:00-10:00</div>
                            <div className='item-time-slot col-md-1'>10:00-11:00</div>
                            <div className='item-time-slot col-md-1'>11:00-12:00</div>
                            <div className='item-time-slot col-md-1'>14:00-15:00</div>
                            <div className='item-time-slot col-md-1'>16:00-17:00</div>
                            <div className='item-time-slot col-md-1 active-slot'>17:00-18:00</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
