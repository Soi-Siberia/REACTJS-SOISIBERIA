import React, { Component } from 'react';
import { connect } from "react-redux";

class ManageSpecialty extends Component {


    render() {
        return (
            <React.Fragment>
                <div>Đây là Manage Specialty</div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
