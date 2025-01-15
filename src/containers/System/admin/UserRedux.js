import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'; 
import { connect } from 'react-redux';

//call api dùng react
import { userService } from '../../../services';

import {languages} from '../../../utils/constant'


class UserRedux extends Component {

   constructor (props) {
    super(props)
    this.state = {
        renderArr: []

    }
   }

  async componentDidMount() {

     let resApiAllcall =  await userService.getAllCode('gender');
     

        this.setState({
            renderArr: resApiAllcall.dataResult,
            
     })
    //  console.log("Check res ALLCode", this.state.renderArr)
   }

    render() {
        // console.log("language to redux: ", this.props.language)
        // console.log("Language to utiles: ", languages.VI)
        let languageRedux = this.props.language
        let genders = this.state.renderArr
        return (
            <div className="user-redux-container" >
                <div className='title'>Manage products Learn use REDUX SoiSiberia</div>
                <div className='user-redux-body'>
                    <div className='user-redux-body-create'>
                        <div className='container'>
                            <div className='row'>
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
                                    <option defaultValue="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="menu.system.roleid" /></label>
                                    <select className="form-select">
                                        <option defaultValue="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="menu.system.avartar" /></label>
                                    <input className='form-control' type='text'></input>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
