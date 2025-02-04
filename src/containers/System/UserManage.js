import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import "./UserManage.scss";
// import {getAllUsers} from '../../services/userService'
import { userService } from "../../services";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
// import { ceil, last } from "lodash";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModal: false,
      isOpenEdit: false,
      userEdit: {},

      currentPage: 1,
      itemprePage: 5

    };
  }

  async componentDidMount() {
    await this.getAllUsersFormReacjs();
    // console.log("get ALL User: ", response)
  }

  getAllUsersFormReacjs = async () => {
    let response = await userService.getAllUsers("ALL");

    if (response && response.errCode === 0) {
      this.setState(
        {
          arrUsers: response.user.reverse(),
        },
        () => {
          //    console.log("Check Users: ", this.state.arrUsers)
        }
      );
    }
  };

  handkeAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  toggleCloseParent = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  crearteNewUser = async (data) => {
    try {
      // console.log("Check data from child in mail: ", data.email)
      let responseNewUser = await userService.CreateNewUser(data);
      if (responseNewUser && responseNewUser.errCode !== 0) {
        alert(responseNewUser.errMessage);
      } else {
        alert("Create New User Success");
        this.toggleCloseParent();
        emitter.emit("EVENT_CLEAR_MODAL_DATA");

        await this.getAllUsersFormReacjs();
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (userId) => {
    console.log("Check userId: ", userId.id);
    try {
      let responseDelete = await userService.DeleteUser(userId.id);
      if (responseDelete && responseDelete.errCode !== 0) {
        alert(responseDelete.errMessage);
      } else {
        alert("Delete User Success");
        this.getAllUsersFormReacjs();
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = (user) => {
    this.setState({
      isOpenEdit: true,
    });
    this.setState({
      userEdit: user,
    });
  };
  
  toggleCloseParentEdit = () => {
    this.setState({
      isOpenEdit: !this.state.isOpenEdit,
    });
  };
  editUser = async (dataedit) => {
    try {
      console.log("Check data from child in mail: ", dataedit);
      let responseEdit = await userService.EditUser(dataedit);
      if (responseEdit && responseEdit.errCode !== 0) {
        alert(responseEdit.message);
      } else {
        alert("Edit User Success");
        this.toggleCloseParentEdit();
        await this.getAllUsersFormReacjs();
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleBtnTable = (currentPage)=>{
    this.setState({
      currentPage: currentPage
    })
  }



  render() {
    let arrUsers = this.state.arrUsers;
    // console.log("Check arrUsers: ", arrUsers)
    //phân trang table
    let {currentPage, itemprePage} = this.state
    let itemLastPageView = currentPage * itemprePage
    let itemFirstPageView = itemLastPageView - itemprePage
    let currentViewPage = arrUsers.slice(itemFirstPageView, itemLastPageView)
    let totalPage = Math.ceil(arrUsers.length/itemprePage)
    //************************************** */
    return (
      <React.Fragment>
        {/*Modal */}
        <ModalUser
          isOpen={this.state.isOpenModal}
          toggleCloseParenttoChild={this.toggleCloseParent}
          crearteNewUser={this.crearteNewUser}
        />
        {this.state.isOpenEdit && (
          <ModalEditUser
            isOpenEdit={this.state.isOpenEdit}
            toggleCloseParentEdit={this.toggleCloseParentEdit}
            userEdit={this.state.userEdit}
            editUser={this.editUser}
          />
        )}
        
        {/* END Modal */}
        <div className="title text-center">Manage user</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px3 mx-3"
            onClick={() => this.handkeAddNewUser()}
          >
            + Add New User
          </button>
        </div>
        <div className="table-users mt-3 mx-3">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>first Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Sex</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
              {currentViewPage &&
                currentViewPage.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.gender === 0 ? "Female" : "Male"}</td>
                      <td>{item.roleId}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="far fa-edit"></i>
                        </button>
                        <button
                          className="btn-Delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          {" "}
                          <i className="fas fa-trash-alt"></i>{" "}
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="btn-table-user mt-2">
            {
              [...Array(totalPage)].map((_, index)=>(
                
                <button key={index} className={`btn-table ${currentPage === index+1 ? "active":""}`}
                onClick={()=>this.handleBtnTable(index+1)}
                >{index+1}</button>

              ))
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
