import React, { Component } from 'react';
import { connect } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import * as actions from "../../../store/actions";
// import {languages} from '../../../utils/constant'

class exClass extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps){
    }

    render() {


        return (
            <>
                <div>Nội dung conponet</div>
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(exClass);
