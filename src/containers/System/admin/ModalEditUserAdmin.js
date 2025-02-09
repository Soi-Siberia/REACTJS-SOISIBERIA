import React, { Component,  } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { emitter } from '../../utils/emitter';
import './ModalEditUserAdmin.scss'

import {languages} from '../../../utils/constant'

class ModalEditUserAdmin extends Component {

    constructor(props){
        super(props);
        this.state ={
          id: '',
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          phoneNumber: '',
          positionId:'',
          gender: '',
          roleId: '',
          avatar: '',
          genderArr: [],
          postionArr: [],
          roleArr: []
          
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevPops){

      if(prevPops.userEdit !== this.props.userEdit)
      {
        let user = this.props.userEdit
        // console.log("Check data componetdidupdate: ", user)
        this.setState({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          phoneNumber: user.phoneNumber,
          positionId: user.positionId || "",
          gender: user.gender || "",
          roleId: user.roleId || ""
        })
      }

      if(prevPops.gendersRedux !== this.props.gendersRedux)
      {
        let genderArrRedux = this.props.gendersRedux
        this.setState({
          genderArr: genderArrRedux

        })
      }

      if(prevPops.postionRedux !== this.props.postionRedux)
      {
        this.setState({
          postionArr: this.props.postionRedux
        })
      }

      if(prevPops.roleRedux !== this.props.roleRedux)
      {
        this.setState({
          roleArr: this.props.roleRedux
        })
      }
    }

    toggle = () => {
        this.props.toggleCloseParentEdit();
    }
    // ko nên modifi trược tiếp state -> dễ sinh lỗi => nên dùng 1 biến trung gian
    handleOnchangInput = (event,id)=> {

      let coppyState = {...this.state}
      coppyState[id] = event.target.value;
      this.setState({
        ...coppyState
      }, () => { 
        // console.log("coppy state: ", coppyState)
      }) 
      // console.log(event.target.value)
    }

    handleSentDataToParent = () => {

      let isConfirmUpdate = window.confirm("Bạn có chắc chắn cập nhật thông tin!")
      if(isConfirmUpdate){
        this.props.sentDataToParent(this.state)
      }else{
        
      }

    }


    render() {
        let {email, firstName, lastName, address, phoneNumber, positionId, gender, roleId } = this.state
        let languageRedux = this.props.language
        let genders = this.state.genderArr
        let postions = this.state.postionArr
        let roles = this.state.roleArr

        return (
            // console.log("Data STATE CHILL: ", this.state),
            // console.log("Check Modal Edit User props Chill", this.props.userEdit),
            <Modal
              size='lg'
              isOpen={this.props.isOpenEdit}
              toggle={()=> this.toggle()} 
              className="modal-contaier">
                
            <ModalHeader 
              toggle={()=> this.toggle()}>
              EDIT USER MANGAGE
            </ModalHeader>  
            <ModalBody>
            <div className='container'>
              <div className='modal-edit-user row' >

                <div className=' col-6 mb-3'>
                    <label className='bold-text fs-5'>Fast Name</label>
                    <input className='form-control mt-2' type='text' placeholder='Enter your Fast Name'onChange={(event) => {
                      this.handleOnchangInput(event,"firstName")}} 
                      value ={firstName}></input>
                </div>
                <div className=' col-6 mb-3'>
                    <label className='bold-text fs-5'>Last Name</label>
                    <input className='form-control mt-2 ' type='text' placeholder='Enter your Last name'onChange={(event) => {
                      this.handleOnchangInput(event,"lastName")}} 
                      value ={lastName}></input>
                </div>
                <div className=' col-6 mb-3'>
                    <label className='bold-text fs-5'>Email</label>
                    <input 
                      className='form-control mt-2'
                      type='text' placeholder='Enter your email' 
                      onChange={(event) => {
                      this.handleOnchangInput(event,"email")
                    }}
                    value ={email} disabled></input>
                </div>
                <div className=' col-6 mb-3'>
                    <label className='bold-text fs-5'>Address</label>
                    <input className='form-control mt-2' type='text' placeholder='Enter your Last name'onChange={(event) => {
                      this.handleOnchangInput(event,"address")
                    }} value ={address} ></input>
                </div>

                <div className=' col-3'>
                    <label className='bold-text fs-5'>Phone Number</label>
                    <input className='form-control mt-2' type='text' placeholder='Enter your phone number'onChange={(event) => {
                      this.handleOnchangInput(event,"phoneNumber")
                    }} value ={phoneNumber} ></input>
                  </div>

                  <div className=' col-3'>
                    <label className='bold-text fs-5'>Render</label>
                    <select
                      className='form-select mt-2'  
                      onChange={(event) => {
                      this.handleOnchangInput(event,"gender")
                    }} value ={gender}>
                      {
                          genders && genders.length>0 && genders.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {languageRedux === languages.VI ? item.valueVi : item.valueEn}
                            </option>
                          );
                        })
                      }
            
                    </select>
                </div>

                <div className=' col-3'>
                    <label className='bold-text fs-5'>Position ID</label>
                    <select
                      className='form-select mt-2' 
                      onChange={(event) => {
                      this.handleOnchangInput(event,"positionId")
                    }} value ={positionId}>
                      {
                        postions && postions.length > 0 && postions.map((item, index)=>{
                          return(
                            <option key={index} value={item.keyMap}>
                              {languageRedux === languages.VI? item.valueVi:item.valueEn}                              
                            </option>
                          )
                        })
                      }
                    </select>
                </div>
                
                <div className=' col-3'>
                    <label className='bold-text fs-5'>Role ID</label>
                    <select
                      className='form-select mt-2' 
                      onChange={(event) => {
                      this.handleOnchangInput(event,"roleId")
                    }} value ={roleId}>
                      {
                        roles && roles.length > 0 && roles.map((item, index)=>{
                          
                          return(
                            <option key={index} value={item.keyMap}>
                              {languageRedux === languages.VI? item.valueVi:item.valueEn}                              
                            </option>
                          )
                        })
                      }
                    </select>
                </div>
                
              </div>
            </div>
            </ModalBody>
            <ModalFooter>
              <Button className='px-3' color="primary" onClick={()=> this.handleSentDataToParent()}>
                Update
              </Button>{' '}
              <Button className='px-3' color="secondary" onClick={()=> this.toggle()}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
      language: state.app.language,
      gendersRedux : state.admin.genders,
      postionRedux : state.admin.postion,
      roleRedux : state.admin.role
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUserAdmin);



