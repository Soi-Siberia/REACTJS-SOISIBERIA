import React, { Component,  } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { emitter } from '../../utils/emitter';
import './ModalBooking.scss';

class ModalBooking extends Component {

    constructor(props){
        super(props);
        this.state ={
        }
    }

    componentDidMount() {
    }

    toggleModal = () => {
        this.props.toggleModal()
    }



    render() {
        return (
            <Modal
              size='lg'
              isOpen={this.props.isOpenModal}
              toggle={()=> this.toggleModal()} 
              className="modal-booking-contaier">
            <ModalHeader toggle={()=> this.toggleModal()}>
              Đặt Lịch Khám
            </ModalHeader>
            <ModalBody>
                <div className='Modal-container-full'>
                    <div className='Modal-container row'>
                        <div className='modal-Name col-6'>
                            <i className="fa fa-user icon-input" aria-hidden="true"></i>
                            <input className='form-control custom-input' placeholder='Họ và tên bênh nhân (bắt buộc)'></input>
                        </div>

                        <div className='modal-Name-radio col-6'>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Nam"></input>
                                <label className="form-check-label" for="inlineRadio1">Nam</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Nu"></input>
                                <label className="form-check-label" for="inlineRadio2">Nữ</label>
                            </div>
                        </div>

                        <div className='modal-Name col-6'>
                            <i className="fa fa-phone icon-input" aria-hidden="true"></i>
                            <input className='form-control custom-input' placeholder='Số điện bênh nhân (bắt buộc)'></input>
                        </div>

                        <div className='modal-Name col-6'>
                            <i className="fa fa-calendar icon-input" aria-hidden="true"></i>
                            <input className='form-control custom-input' placeholder='Năm sinh'></input>
                        </div>

                        <div className='modal-Name col-6'>
                            <i className="fa fa-map-marker  icon-input" aria-hidden="true"></i>
                            <input className='form-control custom-input' placeholder='Địa chỉ'></input>
                        </div>

                        <div className='modal-Name col-6'>
                            <i className="fa fa-envelope icon-input" aria-hidden="true"></i>
                            <input className='form-control custom-input' placeholder='Địa chỉ email'></input>
                        </div>

                        <div className='modal-Name-area col-12'>
                            <i className="fa fa-plus-circle icon-input-area" aria-hidden="true"></i>
                            <textarea className='input-area custom-input-area' placeholder='Lý do khám'></textarea>
                        </div>

                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
              <Button className='px-3' color="primary">
                Save
              </Button>
              <Button className='px-3' color="secondary" onClick={()=> this.toggleModal()}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);



