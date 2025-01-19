import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'; 
import { connect } from 'react-redux';
import './UserRedux.scss';
//call api dùng react
// import { userService } from '../../../services';
import {languages} from '../../../utils/constant'

//import action redux vào 
import * as actions from "../../../store/actions"

//
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

class UserRedux extends Component {

   constructor (props) {
    super(props)
    this.state = {
        renderArr: [],
        positionArr: [],
        rolteArr: [],
        priviewImgUrl: '',
        isOpenImg : false

    }
   }

  async componentDidMount() {

    //gọi active bên redux
    this.props.getGenderRedux()
    this.props.getpostionRedux()
    this.props.getRoleRedux()

    //call api adn resdata api allcode - render
    //  try {
    //     let resApicall =  await userService.getAllCode('gender');

    //     if(resApicall && resApicall.errCode === 0 )
    //     {
    //         this.setState({
    //             renderArr: resApicall.dataResult
    //         })
    //     }
        
    //  } catch (e) {
    //     console.log("call get allcode", e)
    //  }
     //****************** */

   }

   componentDidUpdate(prevProps, prevState, snapshot) // hàm dùng để update componect khi props có thay đổi.
   {
    if(prevProps.genderRedux !== this.props.genderRedux)
        //render => dídupdate
        // hiện tại là this quá khứ là prevPops
    {
        this.setState({
        renderArr: this.props.genderRedux
        })
    }

    if(prevProps.postionRedux !== this.props.postionRedux)
    {
        this.setState({
            positionArr: this.props.postionRedux
        })
    }
    if(prevProps.roleRedux !== this.props.roleRedux)
    {
        this.setState({
            rolteArr: this.props.roleRedux
        })
    }

   }

   handleOnChangeImage = (event)=>{
    let fileAvarta = event.target.files
    let file = fileAvarta[0]

    if(file)
    {
        let objectUrl = URL.createObjectURL(file)
        // console.log("objectUrl", objectUrl)
        this.setState ({
            priviewImgUrl: objectUrl
        })
        // console.log("priviewImgUrl", this.state.priviewImgUrl)


    }
   }

   handleViewImg = ()=>{
    console.log("check priviewImgUrl: ", this.state.priviewImgUrl)
    if(this.state.priviewImgUrl != "")
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
        // console.log("language to redux: ", this.props.language)
        // console.log("Language to utiles: ", languages.VI)
        let languageRedux = this.props.language
        let genders = this.state.renderArr
        let isLoadinggender = this.props.isLoadinggender
        let positons = this.state.positionArr
        let roles = this.state.rolteArr
        // console.log("Loading gender: ", isLoadinggender)
        console.log("check Postion fomr data to redux: ",positons)
        return (
            <div className="user-redux-container" >
                <div className='title'>Manage products Learn use REDUX SoiSiberia</div>
                <div className='user-redux-body'>
                    <div className='user-redux-body-create'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'>{isLoadinggender ? "Loadding Gender" : " "}</div>
                                
                                <div className='col-12'> <FormattedMessage id="menu.system.add" /></div>
                                <div className='col-3'>
                                    <label>Email</label>
                                    <input className='form-control' type='email'></input>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="menu.system.password" /></label>
                                    <input className='form-control' type='pasword'></input>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="menu.system.first-name" /></label>
                                    <input className='form-control' type='text'></input>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="menu.system.last-name" /></label>
                                    <input className='form-control' type='text'></input>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="menu.system.phone-number" /></label>
                                    <input className='form-control' type='text'></input>
                                </div>
                                <div className='col-9'>
                                    <label><FormattedMessage id="menu.system.address" /></label>
                                    <input className='form-control' type='text'></input>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="menu.system.gender" /></label>
                                    <select className="form-select">
                                        {
                                            genders && genders.length > 0 && genders.map((item, index) => {
                                                return (
                                                    <option key={index}>{ languageRedux === languages.VI ?  item.valueVi:item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="menu.system.postion" /></label>
                                    <select className="form-select">
                                        {
                                            positons && positons.length > 0 && positons.map((item, index)=> {
                                                return(
                                                    <option key={index}>{languageRedux === languages.VI ? item.valueVi: item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="menu.system.roleid" /></label>
                                    <select className="form-select">
                                        {
                                            roles && roles.length > 0 && roles.map ((item, index) => {
                                                return (
                                                    <option key={index}>{languageRedux === languages.VI ? item.valueVi: item.valueEn}</option>
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
                                    
                                        {
                                            this.state.isOpenImg &&
                                            <Lightbox
                                            mainSrc={this.state.priviewImgUrl}
                                            onCloseRequest={() => this.handleCloseViewImg()}

                                        />
                                        }
                                       



                                    </div>
                                    
                                </div>

                                <div className='col-1'>
                                    <button className='btn btn-primary'>Save User</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadinggender: state.admin.isLoadinggender,
        postionRedux: state.admin.postion,
        roleRedux: state.admin.role
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderRedux: () => dispatch(actions.fetchGenderStart()),
        getpostionRedux: () => dispatch(actions.fetchPositionStart()),
        getRoleRedux: ()=> dispatch(actions.fetchRoleStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
