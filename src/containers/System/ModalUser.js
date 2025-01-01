import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state ={

        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleCloseParenttoChild();
        // alert("toggle click me")
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
                    <input type='text' placeholder='Enter your email' ></input>
                </div>
                <div className='input-container'>
                    <label>Password</label>
                    <input type='text' placeholder='Enter your password' ></input>
                </div>
                <div className='input-container'>
                    <label>Fast Name</label>
                    <input type='text' placeholder='Enter your Fast Name' ></input>
                </div>
                <div className='input-container'>
                    <label>Last Name</label>
                    <input type='text' placeholder='Enter your Last name' ></input>
                </div>
                <div className='input-container input-address'>
                    <label>Address</label>
                    <input type='text' placeholder='Enter your Last name' ></input>
                </div>
              </div>

              <div className='input-info-user'>
                  <div className='info-user'>
                    <label>Phone Number</label>
                    <input type='text' placeholder='Enter your Last name' ></input>
                  </div>

                  <div className='info-user'>
                    <label>Sex</label>
                    <select>
                      <option value="0">Female</option>
                      <option value="1">Male</option>
                    </select>
                  </div>

                  <div className='info-user'>
                    <label>Role</label>
                    <select>
                      <option value="1">Admin</option>
                        <option value="2">Doctor</option>
                        <option value="3">Patient</option>
                    </select>
                  </div>
                    
                   

                </div>

            </ModalBody>
            <ModalFooter>
              <Button className='px-3' color="primary" onClick={()=> this.toggle()}>
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



