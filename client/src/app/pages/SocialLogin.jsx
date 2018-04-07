// @flow

import * as React from 'react';
import { attemptSocialLogin } from '../modules/auth-user/AuthUserActions';
import { connect } from 'react-redux';
import { selector } from '../services';
import { DASHBOARD, SIGNUP } from 'configs/constants';

export class SocialLogin extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
    }

    redirectToDashboard() {
        this.props.history.push(DASHBOARD);
    };

    redirectToSignUp() {
        this.props.history.push(SIGNUP);
    };

    componentDidUpdate(prevProps) {
        const { loggedInUser, userErrors } = this.props;
         if (loggedInUser) {
             this.redirectToDashboard();
         } else if(userErrors){
            this.redirectToSignUp();
         }
    }

    componentDidMount(){
        const params = new URLSearchParams(this.props.location.search);
        const code = params.get('code');
        this.props.attemptSocialLogin({code: code, account: this.props.match.params.account})
    }

    render(){
        return(
            <div>
            </div>
        );
    }
}

const mapStateToProps = state => selector(state, false, ['auth-user']);

const mapDispatchToProps = dispatch => {
    return {
        attemptSocialLogin: data => dispatch(attemptSocialLogin(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialLogin);
