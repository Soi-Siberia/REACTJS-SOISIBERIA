import React, { Component } from 'react';
import { connect } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import * as actions from "../../store/actions";
// import {languages} from '../../../utils/constant'
import HomeHeader from "../HomePage/HomeHeader"
import "./VerifyEmailBooking.scss"

class VerifyEmailBooking extends Component {

    constructor(props){
        super(props);
        this.state = {
            resultVerifyEmail: ""
        }
    }

    componentDidMount() {
    // Kiểm tra nếu location.search thay đổi thì mới lấy lại dữ liệu
    let dataCheck = ""
    if (this.props.location !== this.props.location.search) {
        let queryParams = new URLSearchParams(this.props.location.search);
        let token = queryParams.get("token");
        let doctorId = queryParams.get("doctor");
        dataCheck = {
            token: token,
            doctorId: doctorId
        }
    }
        this.props.verifyEmailBookingStart(dataCheck)
    }

    componentDidUpdate(prevProps){
        if(prevProps.dataVerify !== this.props.dataVerify)
        {
            this.setState({
                resultVerifyEmail: this.props.dataVerify
            })
        }
    }

    render() {
        let resultVerifyEmail =this.state.resultVerifyEmail
        console.log("resultVerifyEmail: ", resultVerifyEmail)
        return (
            <>
                <div className='container-full'>
                    <HomeHeader />
                    <div className='container'>
                        <div className='Content'>
                            <div className='verify-check'>
                                {
                                    resultVerifyEmail?.message || "Đã có lỗi xảy ra! Vui Lòng thử lại sau..."
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language,
        dataVerify: state.user.dataVerify
    };
};

const mapDispatchToProps = dispatch => {
    return {
        verifyEmailBookingStart: (data) => dispatch(actions.verifyEmailBookingStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailBooking);
