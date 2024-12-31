import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss"
// import {getAllUsers} from '../../services/userService'
import { userService } from '../../services'

class UserManage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }



    async componentDidMount() {
        let response = await userService.getAllUsers('ALL');

        if( response && response.errCode === 0)
        {
             this.setState({
                arrUsers: response.user
            },( ) => {
               console.log("Check Users: ", this.state.arrUsers)
            })
        }


        console.log("get ALL User: ", response)
    }


    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='contaier'>
                <div className="title text-center">Manage user</div>
                <div className='table-users mt-3 mx-3'>
                    <table id="customers">
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
                                        <button className='btn-edit'><i class="far fa-edit"></i></button>
                                        <button className='btn-Delete'> <i class="fas fa-trash-alt"></i> </button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                        

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
