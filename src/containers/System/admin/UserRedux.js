import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'; 
import { connect } from 'react-redux';
import './UserRedux.scss';
//call api dùng react
// import { userService } from '../../../services';
// import {languages} from '../../../utils/constant'

//import action redux vào 
import * as actions from "../../../store/actions"

//
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

//import modal
import ModalUserAdmin from'./ModalUserAdmin.js'
import ModalEditUserAdmin from './ModalEditUserAdmin.js';


class UserRedux extends Component {

   constructor (props) {
    super(props)
    this.state = {
        alluser: [],
        resCreateUser: [],
        isOpenCreate: false,
        isOpenEditModal: false,
        userEdit: {},


        currentPage: 1, // Current page for pagination
        itemsPerPage: 5, // Number of items per page
    }
   }

  componentDidMount() {
    this.props.getAllUserStartRedux()
   }

   componentDidUpdate(prevPops, prevState,snapshot) {

    if(prevPops.listUserRedux !== this.props.listUserRedux )
    {
        this.setState({
            alluser: this.props.listUserRedux
        })
    }

   }


   ///Modal-----------
   handleOnclickAddUser = () =>{
    // console.log("add new user")
    this.setState({
        isOpenCreate: true,
    })
   }

   toggleCloseParent = () =>{
    this.setState({
        isOpenCreate: false,
        isOpenEditModal: false
    })
   }
   /// END Modal-------

   handleCreateNewUser =  (data)=>{

    if(data)
    {
        this.props.getCreateNewUserRedux(data)
    }
    this.toggleCloseParent()
   }


   //Delete User
   handleDeleteUser = async(User) => {
    console.log("ID USER DELETE", User.id)
    await this.props.deleteUserIdStartRedux(User.id)
    this.props.getAllUserStartRedux()

   }

   handleEditUser = (user)=>{
    
    //conver img base64 -> binarry để view
    // let imagebase64 = ''
    // if(user.avatar)
    // {
    //     imagebase64 = new Buffer(user.avatar, 'base64'). toString('binary');
    // }


    this.setState({
        isOpenEditModal: true,
        userEdit: user
    })

    // console.log("isOpenEditModal: ", this.state.isOpenEditModal)
    // console.log("Data User Edit: ", user)
   }

   //table phân trang
   handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
    }

    //data chill sent to parent
    handlChillDataUpdate = async (dataUpdate) =>{
        console.log("Data chill sent to parent: ", dataUpdate)
        await this.props.updateUserStart(dataUpdate)
        await this.props.getAllUserStartRedux()

        this.setState({
            isOpenCreate: false
        })
    }


    render() {
        let listALLUser = this.state.alluser;
        let {currentPage,itemsPerPage, userEdit} = this.state

               // Pagination logic ( phan trang table)
       let indexOfLastUser = currentPage * itemsPerPage;
       let indexOfFirstUser = indexOfLastUser - itemsPerPage;
       let currentUsers = listALLUser.slice(indexOfFirstUser, indexOfLastUser);
       let totalPages = Math.ceil(listALLUser.length / itemsPerPage);
                //

        return (
            <div className="user-redux-container" >
                <div className='title'>Manage products Learn use REDUX SoiSiberia</div>
                <div className='user-redux-body'>
                    <div className='user-redux-body-create'>
                        <div className='container '>
                            <div className='row '>
                                <div className='col-12 ' >
                                <button className='btn btn-primary mb-3'
                                onClick={()=>{this.handleOnclickAddUser()}}                              
                                ><FormattedMessage id="menu.system.add" /></button></div>

                                <div className='col-12 info-table'>
                                    <table className="table table-striped table-bordered">
                                        <thead className="table-dark">
                                        <tr>
                                            <th className='col text-center' >Email</th>
                                            <th className='col text-center' >First Name</th>
                                            <th className='col text-center' >Last Name</th>
                                            <th className='col text-center' >Phone Number</th>
                                            <th className='col text-center' >Address</th>
                                            <th className='col text-center' >Gender</th>
                                            <th className='col text-center' >Position</th>
                                            <th className='col text-center' >Role</th>
                                            <th className='col text-center' >Active</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentUsers && currentUsers.map((item, index) => {
                                                    return(
                                                        <tr key={index}>
                                                            <td>{item.email}</td>
                                                            <td>{item.firstName}</td>
                                                            <td>{item.lastName}</td>
                                                            <td>{item.phoneNumber}</td>
                                                            <td>{item.address}</td>
                                                            <td>{item.gender}</td>
                                                            <td>{item.positionId}</td>
                                                            <td>{item.roleId}</td>
                                                            <td>
                                                                <div className='btn-active'>
                                                                <button className="btn btn-success btn-sm rounded-0" 
                                                                type="button" 
                                                                data-toggle="tooltip" 
                                                                data-placement="top" 
                                                                title="Edit"
                                                                onClick={() => {this.handleEditUser(item)}}
                                                                ><i className="fa fa-edit"></i></button>
                                                                <button className="btn btn-danger btn-sm rounded-0" 
                                                                type="button" 
                                                                data-toggle="tooltip" 
                                                                data-placement="top" 
                                                                title="Delete"
                                                                onClick={() => {this.handleDeleteUser(item)}}
                                                                
                                                                ><i className="fa fa-trash"></i></button>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })

                                            }
                                        </tbody>
                                    </table>

                                    <div className="pagination btn-page-table">
                                        {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index}
                                            className={currentPage === index + 1 ? "active" : ""}
                                            onClick={() => this.handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                        ))}
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <ModalUserAdmin
                    isOpen={this.state.isOpenCreate}
                    toggleCloseParenttoChild={this.toggleCloseParent}
                    crearteNewUser={this.handleCreateNewUser}
                />

                <ModalEditUserAdmin 
                    isOpenEdit = {this.state.isOpenEditModal}
                    toggleCloseParentEdit={this.toggleCloseParent}
                    crearteNewUser={this.handleCreateNewUser}
                    userEdit = {userEdit}
                    sentDataToParent = {this.handlChillDataUpdate}
                />
            </div>
            
        )
    }

}

const mapStateToProps = state => {
    return {
        listUserRedux: state.admin.dataAllUser,
        // dataCreateUserRedux: state.admin.dataCreateUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUserStartRedux: ()=> dispatch(actions.getAllUserStart()),
        getCreateNewUserRedux: (data)=> dispatch(actions.createNewUserStart(data)),
        deleteUserIdStartRedux: (idUser) => dispatch(actions.deleteUserIdStart(idUser)),
        updateUserStart: (dataUserUpdate) => dispatch(actions.updateUserStart(dataUserUpdate))
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
