import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state ={
          email: '',
          password: '',
          fastName: '',
          lastName: '',
          address: '',
          phonenumber: '',
          Sex: '',
          Role: ''

        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleCloseParenttoChild();
        // alert("toggle click me")
    }
    // ko nên modifi trược tiếp state -> dễ sinh lỗi => nên dùng 1 biến trung gian
    handleOnchangInput= (event,id)=> {

      let coppyState = {...this.state}
      coppyState[id] = event.target.value;
      this.setState({
        ...coppyState
      }, () => { 
        // console.log("coppy state: ", coppyState)
      }) 
      // console.log(event.target.value)
    }

    handleCheckValideInput = () => {
      let isvalid = true;
      let arrInputCheck = ['email', 'password', 'fastName', 'lastName' ]

      for(let i = 0; i < arrInputCheck.length; i++)
      {
        if(!this.state[arrInputCheck[i]])
        {
          isvalid = false;
          alert("Mising parameter: " + arrInputCheck[i]);
          break;
        }
      }
      return isvalid

    }

    handleAddNewUser= () =>{
      let check = this.handleCheckValideInput();
      if(check)
      {
        this.props.crearteNewUser(this.state)
      }
      // console.log("data modal chill click save",this.state)
    }




    render() {
        return (
            // console.log("giá trị Preran to Props Child ", this.props),
            // console.log("Giá trị biến isOpen truyền từ Cha -> Child: ", this.props.isOpen),
            <Modal
              size='lg'
              isOpen={this.props.isOpen}
              toggle={()=> this.toggle()} 
              className="modal-user-contaier">
            <ModalHeader toggle={()=> this.toggle()}>
              ADD NEW USER
            </ModalHeader>
            <ModalBody>

              <div className='modal-user-body'>
                <div className='input-container'>
                    <label>Email</label>
                    <input 
                      type='text' placeholder='Enter your email' 
                      onChange={(event) => {
                      this.handleOnchangInput(event,"email")
                    }}
                    value ={this.state.email}></input>
                </div>
                <div className='input-container'>
                    <label>Password</label>
                    <input type='text' placeholder='Enter your password' onChange={(event) => {
                      this.handleOnchangInput(event,"password")}} 
                      value ={this.state.password}></input>
                </div>
                <div className='input-container'>
                    <label>Fast Name</label>
                    <input type='text' placeholder='Enter your Fast Name'onChange={(event) => {
                      this.handleOnchangInput(event,"fastName")}} 
                      value ={this.state.fastName}></input>
                </div>
                <div className='input-container'>
                    <label>Last Name</label>
                    <input type='text' placeholder='Enter your Last name'onChange={(event) => {
                      this.handleOnchangInput(event,"lastName")}} 
                      value ={this.state.lastName}></input>
                </div>
                <div className='input-container input-address'>
                    <label>Address</label>
                    <input type='text' placeholder='Enter your Last name'onChange={(event) => {
                      this.handleOnchangInput(event,"address")
                    }} value ={this.state.address} ></input>
                </div>
              </div>

              <div className='input-info-user'>
                  <div className='info-user'>
                    <label>Phone Number</label>
                    <input type='text' placeholder='Enter your phone number'onChange={(event) => {
                      this.handleOnchangInput(event,"phonenumber")
                    }} value ={this.state.phonenumber} ></input>
                  </div>

                  <div className='info-user'>
                    <label>Sex</label>
                    <select onChange={(event) => {
                      this.handleOnchangInput(event,"Sex")
                    }} value ={this.state.Sex}>
                      <option value="0">Female</option>
                      <option value="1">Male</option>
                    </select>
                  </div>

                  <div className='info-user'>
                    <label>Role</label>
                    <select onChange={(event) => {
                      this.handleOnchangInput(event,"Role")
                    }} value ={this.state.Role}>
                      <option value="1">Admin</option>
                        <option value="2">Doctor</option>
                        <option value="3">Patient</option>
                    </select>
                  </div>
                    
                   

                </div>

            </ModalBody>
            <ModalFooter>
              <Button className='px-3' color="primary" onClick={()=> this.handleAddNewUser()}>
                Save
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



