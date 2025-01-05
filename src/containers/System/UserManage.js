import React, { Component,} from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss"
// import {getAllUsers} from '../../services/userService'
import { userService } from '../../services'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal : false,
            isOpenEdit: false,
            userEdit: {}
        }
    }



    async componentDidMount() {
       await this.getAllUsersFormReacjs();
     // console.log("get ALL User: ", response)
    }

    getAllUsersFormReacjs = async()=>{
        let response = await userService.getAllUsers('ALL');

        if( response && response.errCode === 0)
        {
             this.setState({
                arrUsers: response.user
            },( ) => {
            //    console.log("Check Users: ", this.state.arrUsers)
            })
        }

    }

    handkeAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }

    toggleCloseParent = () =>{
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    crearteNewUser = async (data) => {
        try {
            // console.log("Check data from child in mail: ", data.email)
            let responseNewUser = await userService.CreateNewUser(data);
            if(responseNewUser && responseNewUser.errCode !== 0)
            {
                alert(responseNewUser.errMessage)
            }else{
                alert("Create New User Success")
                this.toggleCloseParent()
                emitter.emit('EVENT_CLEAR_MODAL_DATA')

                await this.getAllUsersFormReacjs()
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (userId) => {
            console.log("Check userId: ", userId.id)
            try {
                let responseDelete = await userService.DeleteUser(userId.id);
                if(responseDelete && responseDelete.errCode !== 0)
                {
                    alert(responseDelete.errMessage)
                }else{
                    alert("Delete User Success")
                    this.getAllUsersFormReacjs()
                }
            } catch (e) {
                console.log(e)
            }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenEdit: true
        })
        this.setState({
            userEdit: user
        })

    }
    toggleCloseParentEdit = () =>{
        this.setState({
            isOpenEdit: !this.state.isOpenEdit
        })
    }
    editUser = async (dataedit)=>{
        try {
        console.log("Check data from child in mail: ", dataedit)
        let responseEdit = await userService.EditUser(dataedit);
        if(responseEdit && responseEdit.errCode !== 0)
        {
            alert(responseEdit.message)
            
        }else{
            alert("Edit User Success")
            this.toggleCloseParentEdit()
            await this.getAllUsersFormReacjs()
        }
        } catch (e) {
            console.log(e)
        }
        
    }



    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='contaier'>
                {/*Modal */}
                <ModalUser
                    isOpen = {this.state.isOpenModal}
                    toggleCloseParenttoChild = {this.toggleCloseParent}
                    crearteNewUser = {this.crearteNewUser}
                />
                { this.state.isOpenEdit &&
                    <ModalEditUser
                        isOpenEdit = {this.state.isOpenEdit}    
                        toggleCloseParentEdit = {this.toggleCloseParentEdit}
                        userEdit = {this.state.userEdit}
                        editUser = {this.editUser}
                    />
                }
                {/* END Modal */}
                <div className="title text-center">Manage user</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px3 mx-3'
                     onClick={() => this.handkeAddNewUser()}>
                        + Add New User</button>
                </div>
                <div className='table-users mt-3 mx-3'>
                    <table id="customers">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>Fast Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                        {   arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td> 
                                        <button className='btn-edit' onClick={()=> this.handleEditUser(item)}><i className="far fa-edit"></i></button>
                                        <button className='btn-Delete'onClick={()=> this.handleDeleteUser(item)}> <i className="fas fa-trash-alt"></i> </button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                        
                    </tbody>    
                    </table>
                </div>
            </div>


        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
