import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageSpecialty from '../containers/System/specialty/SpecialtyManager';

// import RegisterPackageGroupOrAcc from '../containers/Specialty/RegisterPackageGroupOrAcc';
import Header from'../containers/Header/Header';

class Specialty extends Component {
    render() {
        const { systemMenuPath , isLoggedIn} = this.props;
        return (
            <React.Fragment>
            {isLoggedIn && <Header />}
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/Specialty/manage-specialty" component={ManageSpecialty} />
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
