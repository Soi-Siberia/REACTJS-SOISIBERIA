import React, { Component,  } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalUserAdmin.scss'
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

import * as actions from "../../../store/actions"
import {languages, CommonUtils} from '../../../utils'

class ModalUserAdmin extends Component {

    constructor(props){
        super(props);
        this.state ={
            renderArr: [],
            positionArr: [],
            rolteArr: [],
            priviewImgUrl: '',
            isOpenImg : false,
    
            email: '',
            password:'',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            avatar:'',
            role:'',
            position:'',
            gender:''

        }
        // this.listenToEmiiter();
    }



    async componentDidMount() {
        //gọi active bên redux
        this.props.getGenderRedux()
        this.props.getpostionRedux()
        this.props.getRoleRedux()
    }

    componentDidUpdate(prevProps, prevState, snapshot) // hàm dùng để update componect khi props có thay đổi.
   {
    if(prevProps.genderRedux !== this.props.genderRedux)
        //render => dídupdate
        // hiện tại là this quá khứ là prevPops
    {
        let genderArrRedux = this.props.genderRedux
        this.setState({
            renderArr: genderArrRedux,
            gender: genderArrRedux && genderArrRedux.length > 0 ? genderArrRedux[0].keyMap : '',
        })
    }

    if(prevProps.postionRedux !== this.props.postionRedux)
    {
        let positionArrRedux = this.props.postionRedux
        this.setState({
            positionArr: positionArrRedux,
            position: positionArrRedux && positionArrRedux.length > 0 ? positionArrRedux[0].keyMap : ''
        })
    }
    if(prevProps.roleRedux !== this.props.roleRedux)
    {
        let roleArrRedux = this.props.roleRedux
        this.setState({
            rolteArr: roleArrRedux,
            role: roleArrRedux && roleArrRedux.length > 0 ? roleArrRedux[0].keyMap : ''
        })
    }

    if(prevProps.listUserRedux !== this.props.listUserRedux)
    {
        this.setState({
            email: '',
            password:'',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            avatar:'',
            priviewImgUrl: '',

        })
    }

   }

    toggle = () => {
        this.props.toggleCloseParenttoChild();
    }
    // ko nên modifi trược tiếp state -> dễ sinh lỗi => nên dùng 1 biến trung gian
    handleOnchange = (event,id)=> {
      let coppyState = {...this.state}
      coppyState[id] = event.target.value;
      this.setState({
        ...coppyState
      }, () => { 
        // console.log("coppy state done: ", coppyState)
      }) 
      // console.log(event.target.value)
    }

    handleCheckValideInput = () => {
      let isvalid = true;
      let arrInputCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address' ]

      for(let i = 0; i < arrInputCheck.length; i++)
      {
        if(!this.state[arrInputCheck[i]])
        {
          isvalid = false;
          alert("Mising input parameter: " + arrInputCheck[i]);
          break;
        }
      }
      return isvalid

    }

    handleAddNewUser= () =>{
      let {  email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar} = this.state
      let sentParen = { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar }
      let check = this.handleCheckValideInput();
      if(check)
      {
        this.props.crearteNewUser(sentParen)
      }
    //   console.log("data modal chill click save",sentParen)
    }

    //sử lý IMAGE
    handleOnChangeImage = async (event)=>{
        let fileAvarta = event.target.files
        let file = fileAvarta[0]
    
        if(file)
        {
            let objectUrl = URL.createObjectURL(file)
            let converBase64 = await CommonUtils.getBase64(file)
            console.log("converBase64 file: ", converBase64)
            this.setState ({
                priviewImgUrl: objectUrl,
                avatar: converBase64
            }, ()=>{
                console.log("Onchang IMG: ", this.state)
            }) 
            // console.log("priviewImgUrl", this.state.priviewImgUrl)
    
    
        }
       }
    
    handleViewImg = ()=>{
        // console.log("check priviewImgUrl: ", this.state.priviewImgUrl)
        if(this.state.priviewImgUrl !== "")
        {
            this.setState({
                isOpenImg: true
            })
        }
    
       }
    handleCloseViewImg =()=>{
        this.setState({
            isOpenImg: false
        })
       }
    




    render() {
        // console.log("Giá trị State tets: ",this.state)
        let languageRedux = this.props.language
        let genders = this.state.renderArr
        let positons = this.state.positionArr
        let roles = this.state.rolteArr

        let { email, password, firstName, lastName, phoneNumber, address } = this.state
        return (
            // console.log("giá trị Preran to Props Child ", this.props),
            // console.log("Giá trị biến isOpen truyền từ Cha -> Child: ", this.props.isOpen),
            <Modal
              size='xl'
              isOpen={this.props.isOpen}
              toggle={()=> this.toggle()} 
              className="modal-admin-user-contaier">
            <ModalHeader toggle={()=> this.toggle()}>
              ADD NEW USER
            </ModalHeader>
            <ModalBody>

            <div className='user-redux-body'>
                    <div className='user-redux-body-create'>
                        <div className='container'>
                            <div className='row'>
                                {/* <div className='col-12'>{isLoadinggender ? "Loadding Gender" : " "}</div> */}
                                {/* <div className='col-12'>
                                <button className='btn btn-primary'
                                onClick={()=>{this.handleOnclickAddUser()}}
                                
                                ><FormattedMessage id="menu.system.add" /></button></div> */}
                                <div className='col-3'>
                                    <label>Email</label>
                                    <input className='form-control' type='email'
                                    value={email} 
                                    onChange = { (event) => {this.handleOnchange(event, "email")}}
                                    ></input>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="menu.system.password" /></label>
                                    <input className='form-control' type='pasword'
                                    value={password} 
                                    onChange = { (event) => {this.handleOnchange(event, "password")}}                                    ></input>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="menu.system.first-name" /></label>
                                    <input className='form-control' type='text'
                                    value={firstName} 
                                    onChange = { (event) => {this.handleOnchange(event, "firstName")}}                                    ></input>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="menu.system.last-name" /></label>
                                    <input className='form-control' type='text'
                                    value={lastName} 
                                    onChange = { (event) => {this.handleOnchange(event, "lastName")}}                                    ></input>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="menu.system.phone-number" /></label>
                                    <input className='form-control' type='text'
                                    value={phoneNumber} 
                                    onChange = { (event) => {this.handleOnchange(event, "phoneNumber")}}                                    ></input>
                                </div>
                                <div className='col-9'>
                                    <label><FormattedMessage id="menu.system.address" /></label>
                                    <input className='form-control' type='text'
                                    value={address} 
                                    onChange = { (event) => {this.handleOnchange(event, "address")}}                                    ></input>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="menu.system.gender" /></label>
                                    <select className="form-select"
                                    onChange={(event) => {this.handleOnchange(event,'gender')}}>
                                        {
                                            genders && genders.length > 0 && genders.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{ languageRedux === languages.VI ?  item.valueVi:item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="menu.system.postion" /></label>
                                    <select className="form-select" onChange={(event) => {this.handleOnchange(event,'position')}} >
                                        {
                                            positons && positons.length > 0 && positons.map((item, index)=> {
                                                return(
                                                    <option key={index} value={item.keyMap}>{languageRedux === languages.VI ? item.valueVi: item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="menu.system.roleid" /></label>
                                    <select className="form-select" onChange={(event) => {this.handleOnchange(event,'role')}}>
                                        {
                                            roles && roles.length > 0 && roles.map ((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{languageRedux === languages.VI ? item.valueVi: item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <div>
                                        <label><FormattedMessage id="menu.system.avartar"/></label>
                                        <div className='priview-Img-Contaier'>
                                            <input id='previewImg' className='form-control ' type='file' hidden
                                            onChange={(event) => {this.handleOnChangeImage(event)}}
                                            
                                            ></input>
                                            <label htmlFor='previewImg' className='previewImg'>Tải Ảnh <i className="fas fa-upload"></i></label>
                                            <div className='priview-Img'
                                             style={{
                                                backgroundImage: `url(${this.state.priviewImgUrl})`
                                              }} onClick={()=>this.handleViewImg()}></div>
                                        </div>
                                    
                                        {/* {
                                            this.state.isOpenImg &&
                                            <Lightbox
                                            mainSrc={this.state.priviewImgUrl}
                                            onCloseRequest={() => this.handleCloseViewImg()}

                                        />
                                        } */}
                                       



                                    </div>
                                    
                                </div>

                            </div>
                        </div>
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
        language: state.app.language,
        genderRedux: state.admin.genders,
        postionRedux: state.admin.postion,
        roleRedux: state.admin.role,
        listUserRedux: state.admin.dataAllUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderRedux: () => dispatch(actions.fetchGenderStart()),
        getpostionRedux: () => dispatch(actions.fetchPositionStart()),
        getRoleRedux: ()=> dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserAdmin);



