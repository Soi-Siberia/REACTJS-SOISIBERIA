import React, { Component } from 'react';
import { connect } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./DoctorExtra.scss"
import * as actions from "../../../store/actions";
// import {languages} from '../../../utils/constant'

// import moment from "moment";
import "moment/locale/vi"; // Import Tiếng Việt

import { FormattedPrice } from '../../../components/Formating';


class DoctorExtra extends Component {

    constructor(props){
        super(props);
        this.state = {
            isHideDetail: false,
            extraInforDoctor: [],
        }
    }

    componentDidMount() {

        this.props.getExtraInforDoctorByIdStart(this.props.doctorID)

    }

    componentDidUpdate(prevProps){
        if(prevProps.extraInforDoctor !== this.props.extraInforDoctor)
        {
            this.setState({
                extraInforDoctor: this.props.extraInforDoctor
            })
        }
    }




    render() {
        let {isHideDetail, extraInforDoctor} = this.state
        let detailDoctor = Object.keys(extraInforDoctor || {}).length > 0 ? extraInforDoctor : {}
        // console.log("extraInforDoctor Data: ",extraInforDoctor)
        return (
            <React.Fragment>
                    <div className='local-clinic'>
                            <div className='address-doctor'>
                                <h2>Địa chỉ khám</h2>
                                <div className='title-address'>{detailDoctor.nameClinic}</div>
                                <div className='address'>{detailDoctor.addressClinic}</div>
                            </div>
                            <div className='clinic-price'>
                                <div className='title-clinic' style={{display: isHideDetail? 'none': 'flex', }}>
                                    <div className='title-price'>Giá Khám: </div>
                                    <div className='price'> { <FormattedPrice value = {detailDoctor?.priceData?.valueVi} /> || "Vui Lòng Liên hệ"}  </div>
                                </div>
                                {
                                    isHideDetail && (
                                        <div className='detail-clinic-chitiet'>
                                            <div className='chitiet-gia'>
                                                <div className='gia-tile'>Giá Khám: </div>
                                                <div className='giaChitiet'>{detailDoctor?.priceData?.valueVi ? `${detailDoctor.priceData.valueVi} Vnđ` : "Vui Lòng Liên hệ"}</div>
                                            </div>
                                            <div className='infor-chitiet'>
                                                <div className='detail-chitiet'>{ detailDoctor?.priceData?.valueEn ? `Được ưu tiên khám trước khi đặt lịch tại Booking care, Giá cho người nước ngoài là: ${detailDoctor.priceData.valueEn} $` : "Được ưu tiên khám trước khi đặt lịch tại Booking care, Giá cho người nước ngoài vui lòng liên hệ " }</div>
                                                <div className='chitiet-thanhtoan'>{ detailDoctor?.paymentData?.valueVi ? `Người bệnh có thể thanh toán bằng hình thức ${detailDoctor.paymentData.valueVi}`: "Hình thức thanh toán đa dạng."}</div>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className='detail-clinic'
                                    onClick={() => this.setState({isHideDetail: !isHideDetail})}
                                    > {!isHideDetail? 'Xem chi tiết ' : 'Ẩn chi tiết'}</div>
                            </div>
                            <div className='underwrite'>
                                <div className='title-underwrite'>Loại bảo hiểm áp dụng</div>
                                <div className='detail-underwrite'>xem chi tiết</div>
                            </div>
                    </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        scheduleDoctor: state.doctor.scheduleDoctor,
        language: state.app.language,
        extraInforDoctor: state.doctor.extraInforDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSchduleDoctorByIdStart: (id) => dispatch(actions.getSchduleDoctorByIdStart(id)),
        getExtraInforDoctorByIdStart: (id) => dispatch(actions.getExtraInforDoctorByIdStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtra);
