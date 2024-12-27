import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
        }
    }

    handleOnchangeInputUserName = (event) =>{
        this.setState ({
            username: event.target.value
        })
        console.log(event.target.value)
    }
    handleOnchangeInputPassword = (event) => {
        this.setState ({
            password: event.target.value
        })
    }

    handleLogin = () =>{
        console.log("username: ",this.state.username, "--- Password: ", this.state.password)
    }

    handleOnClickShowPassword = ()=>{
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className='login-backgroud'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center text-login'>Log in</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text' className='form-control' 
                            placeholder='Enter your username' 
                            value={this.state.username}
                            onChange={(event)=> this.handleOnchangeInputUserName(event)}
                            ></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='showPassword'>
                                <input type={this.state.isShowPassword ? 'text':'password'} className='form-control' placeholder='Enter your password'
                                value={this.state.password}
                                onChange={(event) => this.handleOnchangeInputPassword(event)}></input>
                                <span
                                    onClick={()=> this.handleOnClickShowPassword()}
                                >
                                <i class={this.state.isShowPassword ? "fa fa-eye-slash" : "fa fa-eye" } aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12 btn-login'>
                            <button className='login-buttom' onClick={ ()=> this.handleLogin()}>Log in</button>
                        </div>
                        <div className='col-12 forget-pass'>Forget your password?</div>
                        <div className='col-12 login-with'>Or login with:</div>
                        <div className='col-12 social-login'>
                            <i class="fab fa-google-plus-g google"></i>
                            <i class="fab fa-facebook facebook"></i>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
