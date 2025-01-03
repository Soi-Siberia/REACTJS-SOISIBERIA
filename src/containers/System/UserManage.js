import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss"
// import {getAllUsers} from '../../services/userService'
import { userService } from '../../services'
import ModalUser from './ModalUser';

class UserManage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal : false
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
            let responseNewUser = await userService.CreateNewUser(data);
            if(responseNewUser && responseNewUser.errCode !== 0)
            {
                alert(responseNewUser.errMessage)
            }else{
                alert("Create New User Success")
                this.toggleCloseParent()
                this.getAllUsersFormReacjs()
            }
        } catch (e) {
            console.log(e)
        }
        

        // if(responseNewUser && responseNewUser.errCode !== 0)
        // {
        //     alert(responseNewUser.errMessage)

        // }else{
        //     alert("Create New User Success")
        // }
        // console.log("Check responseNewUser: ", responseNewUser)
        // console.log("Check data from child: ", data)
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='contaier'>
                <ModalUser
                    isOpen = {this.state.isOpenModal}
                    test ="123123"
                    toggleCloseParenttoChild = {this.toggleCloseParent}
                    crearteNewUser = {this.crearteNewUser}
                />
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
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td> 
                                        <button className='btn-edit'><i className="far fa-edit"></i></button>
                                        <button className='btn-Delete'> <i className="fas fa-trash-alt"></i> </button>
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
