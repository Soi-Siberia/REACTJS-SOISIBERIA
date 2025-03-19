import React, { Component,  } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { emitter } from '../../utils/emitter';
import './ModalBooking.scss';
import * as actions from '../../store/actions';

import ProfileDoctor from '../Patient/Doctor/ProfileDoctor.js'

import {FormattedPrice} from '../../components/Formating'

class ModalBooking extends Component {

    constructor(props){
        super(props);
        this.state ={
            inforDoctor: [],
            isBookingForSelf: true,

            // sate sent save booking
            statusID: "",
            doctorID: "",
            patienID: "",
            paymentId: "",
            bookerName: "",
            bookerPhone:"",
            date: "",
            timeType: "",
            reason:"",
            // state sent save pattient
            fullName: "",
            PhoneNumber: "",
            email: "",
            birthday: "",
            gender: "",
            address: ""
        }
    }

    async componentDidMount() {
        let doctorID = this.props.doctorID
        this.props.getProfileDoctorByIdStart(doctorID)
        this.props.fetchGenderStart()
    }

    componentDidUpdate(prevProps){
        if(prevProps.profileDoctor !== this.props.profileDoctor)
        {
            let profileDoctor = this.props.profileDoctor
            if(Object.keys(this.props.profileDoctor).length > 0)
            {
                console.log("this.props.profileDoctor: ", this.props.profileDoctor)
                this.setState({
                    inforDoctor: profileDoctor,
                })
            }
            
        }
    }

    toggleModal = () => {
        this.props.toggleModal()
    }

    handleOnchangBooker = (value) => {
        // console.log("Giá trị event: ", value)
        this.setState({
            isBookingForSelf : value

        })
    }
    handleOnchangBooking = (e, name) =>{
        // console.log("value: ",e.target.value," name: ", name)
    }



    render() {
        let {inforDoctor,isBookingForSelf} = this.state
        let {timeBooking, genders} = this.props
        // console.log("***********************")
        // console.log("timeBooking: ", timeBooking)

        // console.log("isBookingForSelf state", isBookingForSelf)
        return (
            <Modal
              size='xl'
              isOpen={this.props.isOpenModal}
              toggle={()=> this.toggleModal()} 
              className="modal-booking-contaier">
            <ModalHeader toggle={()=> this.toggleModal()}>
                <div className='modal-tieude'>
                Đặt Lịch Khám
                </div>
            </ModalHeader>
            
            <ModalBody>
                <>
                <ProfileDoctor 
                    inforDoctor = {inforDoctor}
                    timeBooking = {timeBooking}
                />
                <div className='Modal-price row'>
                    <div className='infor-price col-2'>
                        <div className='price-title'>Giá khám</div>
                        <div className='price-value'>
                            {
                                <FormattedPrice value = {inforDoctor?.doctor_infor?.priceData?.valueVi} /> || "Đang cập nhật"
                            }
                        </div>
                    </div>
                </div>
                <div className='dauvao-nhom'>
                    <div className="form-check booking-for-me">
                        <input className="form-check-input check-booking-input" type="radio" 
                                name="inlineRadioOptions" id="inlineRadio1" value="ChoToi"
                                checked = {isBookingForSelf}
                                onChange={() => this.handleOnchangBooker(true)}></input>
                        <label className="form-check-label check-booking-label" htmlFor="inlineRadio1">Đặt cho bản thân tôi</label>
                    </div>
                    <div className="form-check booking-for-relative">
                        <input className="form-check-input check-booking-input" type="radio" 
                                name="inlineRadioOptions" id="inlineRadio2" value="ChoNguoiThan"
                                checked = {!isBookingForSelf}
                                onChange={() =>this.handleOnchangBooker(false)}></input>
                        <label className="form-check-label check-booking-label" htmlFor="inlineRadio2">Đặt cho người thân</label>
                    </div>
                </div>
                <div className='Modal-container-full'>
                        {
                            isBookingForSelf === false && (
                                <div className='booking-relative row'>
                                    <div className='title-nhom'>Thông tin người đặt lịch</div>
                                    <div className='relative-Nhom relative-name col-6'>
                                        <i className="fa fa-user icon-input" aria-hidden="true"></i>
                                        <input className='form-control custom-input' placeholder='Họ và tên người đặt lịch (bắt buộc)'
                                            onChange={(e) => this.handleOnchangBooking(e,'bookerName')}></input>
                                    </div>
                                

                                    <div className='relative-Nhom relative-phone col-6'>
                                        <i className="fa fa-phone icon-input" aria-hidden="true"></i>
                                        <input className='form-control custom-input' placeholder='Số điện liên hệ (bắt buộc)'
                                                onChange={(e) => this.handleOnchangBooking(e,'bookerPhone')}></input>
                                    </div>

                                    <div className='title-nhom'>Thông tin bệnh nhân</div>

                                </div>
                            )
                        }
                    <div className='Modal-container row'>
                        <div className='modal-Name col-6'>
                            <i className="fa fa-user icon-input" aria-hidden="true"></i>
                            <input 
                                className='form-control custom-input' placeholder='Họ và tên bênh nhân (bắt buộc)'
                                onChange={(e) => this.handleOnchangBooking(e,'fullName')}>
                            </input>
                        </div>

                        <div className='modal-Name-gender col-6'>
                            <select class="form-select gender-booking" 
                                    aria-label="Default select example"
                                    onChange={(e) => this.handleOnchangBooking(e,'gender')}>
                                <option selected value="">Giới tính</option>

                                {
                                    genders && genders.length > 0 && genders.map((item, index) => {
                                        return(
                                            <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>

                        <div className='modal-Name col-6'>
                            <i className="fa fa-phone icon-input" aria-hidden="true"></i>
                            <input 
                                className='form-control custom-input' placeholder='Số điện bênh nhân (bắt buộc)'
                                onChange={(e) => this.handleOnchangBooking(e,'PhoneNumber')}>

                            </input>
                        </div>

                        <div className='modal-Name col-6'>
                            <i className="fa fa-calendar icon-input" aria-hidden="true"></i>
                            <input 
                                type='date' className='form-control custom-input' placeholder='Ngày sinh'
                                onChange={(e) => this.handleOnchangBooking(e,'birthday')}>
                            </input>
                        </div>

                        <div className='modal-Name col-6'>
                            <i className="fa fa-map-marker  icon-input" aria-hidden="true"></i>
                            <input className='form-control custom-input' placeholder='Địa chỉ'
                             onChange={(e) => this.handleOnchangBooking(e,'address')}></input>
                        </div>

                        <div className='modal-Name col-6'>
                            <i className="fa fa-envelope icon-input" aria-hidden="true"></i>
                            <input className='form-control custom-input' placeholder='Địa chỉ email'
                            onChange={(e) => this.handleOnchangBooking(e,'email')}></input>
                        </div>

                        <div className='modal-Name-area col-12'>
                            <i className="fa fa-plus-circle icon-input-area" aria-hidden="true"></i>
                            <textarea className='input-area custom-input-area' placeholder='Lý do khám'
                            onChange={(e) => this.handleOnchangBooking(e,'reason')}></textarea>
                        </div>

                    </div>
                    {/* ----------thanh toán-------------- */}
                    <div className='booking-thanhtoan'>
                        <div className='title'>Thanh toán sau tại cơ sở y tế</div>
                        <div className='chitiet-thanhtoan'>
                            <div className='booking-content booking-price'>
                                <div className='chitiet-title'>Giá Khám:</div>
                                <div className='thanhtoan-giakham'>
                                    {
                                        <FormattedPrice value = {inforDoctor?.doctor_infor?.priceData?.valueVi} /> || "Vui Lòng Liên Hệ"
                                    }
                                </div>
                            </div>
                            <div className='booking-content booking-datlich'>
                                <div className='chitiet-title'>Phí đặt lịch:</div>
                                <div className='thanhtoan-datlich'>Miễn Phí</div>
                            </div>
                            <div className='booking-content chitiet-tongtien'>
                                <div className='chitiet-title'>Tổng tiền:</div>
                                <div className='tongtien'>
                                    {
                                        <FormattedPrice value = {inforDoctor?.doctor_infor?.priceData?.valueVi} /> || "Vui Lòng Liên Hệ"

                                    }
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className='ghichu-dauvao'>
                            <div className='ghichu-giua'>Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ tục</div>
                            <div className='ghichu-luuy'>
                                <p className='luuy-tatle'>Lưu ý</p>
                                <p className='luuy-content'>Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, khi điền thông tin anh/chị vui lòng:</p>
                                <ul>
                                    <li>Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: <b>Trần Văn A</b> </li>
                                    <li>Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn "Xác nhận"</li>
                                </ul>
                            </div>
                    </div>
                </div>
                </>
            </ModalBody>

            <ModalFooter>
              <Button className='px-3' color="primary">
                Đặt Lịch
              </Button>
              <Button className='px-3' color="secondary" onClick={()=> this.toggleModal()}>
                Thoát
              </Button>
            </ModalFooter>
          </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        profileDoctor: state.doctor.profileDoctor,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfileDoctorByIdStart: (id) => dispatch(actions.getProfileDoctorByIdStart(id)),
        fetchGenderStart: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);



