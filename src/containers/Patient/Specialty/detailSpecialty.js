import React, { Component } from 'react';
import { connect } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./detailSpecialty.scss"
import HomeHeader from '../../HomePage/HomeHeader';
import * as actions from "../../../store/actions";
// import {languages} from '../../../utils/constant'

class detailSpecialty extends Component {

    constructor(props){
        super(props);
        this.state = {
            isShowAll: false,
            specialty:""
        }
    }

    componentDidMount() {
        this.props.createSpecialtyByIdStart(3)
    }

    componentDidUpdate(prevProps){
        if(prevProps.specialty !== this.props.specialty){
            this.setState({
                specialty: this.props.specialty
            })
        }
    }

    onClickViewAll = () => {
        let {isShowAll} = this.state;
        this.setState({
            isShowAll: !isShowAll
        })
    }
    render() {
        let {isShowAll, specialty} = this.state;
        console.log('check specialty specialty by ID: ', specialty)

        return (
            <>
                <HomeHeader />
                <div className='detail-specialty-container pt-4'>
                    <div className='container'>
                        <div className='detail-specialty-content'>
                            <div className='detail-specialty-title'>
                                <h1>{specialty.name}</h1>
                            </div>
                            <div className='detail-specialty-description'>
                                <div className= {isShowAll?'view-all':'view-it'} dangerouslySetInnerHTML={{__html: specialty?.HTML || "<p> Đang cập nhật .... </p>"}}/>
                            </div>

                            <div className={isShowAll?'xemthem':'anbot'}
                            onClick={()=> this.onClickViewAll()}>
                                {!isShowAll? 'Xem thêm': 'Ẩn bớt'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='detail-specialty-doctor-container'>
                    <div className='container'>
                        <div className='detail-specialty-doctor-content'>
                            
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
        specialty: state.doctor.specialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createSpecialtyByIdStart: (id) => dispatch(actions.createSpecialtyByIdStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(detailSpecialty);
