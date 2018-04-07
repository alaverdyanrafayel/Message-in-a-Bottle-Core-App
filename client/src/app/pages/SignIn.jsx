// @flow

import React from 'react';
import { Button, Input, InputGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { selector } from '../services';
import { connect } from 'react-redux';
import { attemptSignIn } from '../modules/auth-user/AuthUserActions';
import { isEmail, isEmpty, isLength, matches } from 'validator';
import { clone, cloneDeep, isEqual } from 'lodash';
import SocialNetworks from '../../components/SocialNetworks';
import {
    DASHBOARD,
    INVALID_EMAIL,
    LENGTH_REQUIRED,
    PASSWORD_MIN_LENGTH,
    REQUIRED
} from '../../configs/constants';

const signInState = {
    fields: {
        email: '',
        password: ''
    },
    errors: {
        email: '',
        password: ''
    }
};

type Props = {
    attemptSignIn: ({fields: Object, errors: Object}) => {}
};

type State = {
    fields: {
        email: string,
        password: string
    },
    errors: {
        email?: string,
        password?: string
    }
}

export class SignIn extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);

        this.state = cloneDeep(signInState);
    }

    redirectToDashboard() {
        this.props.history.push(DASHBOARD);
    }

    componentDidUpdate(prevProps) {
        const { userFields, userErrors, loggedInUser } = this.props;
        
        if (!userFields.equals(prevProps.userFields) || !userErrors.equals(prevProps.userErrors)) {
            this.setState({
                errors: userErrors.toJS(),
                fields: userFields.toJS()
            });
        } else if (loggedInUser) {
            this.redirectToDashboard();
        }
    }


    validate(name: string, value: any) {
        switch (name) {
            case 'email':
                if (isEmpty(value)) {
                    return REQUIRED('Email');
                } else if (!isEmail(value)) {
                    return INVALID_EMAIL('Email');
                } else {
                    return '';
                }
            case 'password':
                if (isEmpty(value)) {
                    return REQUIRED('Password');
                } else if (!isLength(value, PASSWORD_MIN_LENGTH)) {
                    return LENGTH_REQUIRED('Password', { min: PASSWORD_MIN_LENGTH });
                } else {
                    return '';
                }
        }
    }

    handleChange = ({ target: { value, name } }: { target: { value: string, name: string}}) => {
        
        let newState = cloneDeep(this.state);
        
        newState.errors[name] = this.validate(name, value);
        newState.fields[name] = value;
        
        if (!isEqual(this.state, newState)) {
            this.setState(newState);
        }
    };

    handleSubmit = (ev: Object) => {
        ev.preventDefault();

        const { attemptSignIn } = this.props,
            fields = clone(this.state.fields),
            errors = clone(this.state.errors);
        let validationErrors = {};
        Object.keys(fields).map(name => {
            const error = this.validate(name, fields[name]);
            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });
        if (Object.keys(validationErrors).length > 0) {
            this.setState({ errors: validationErrors });

            return;
        }
        attemptSignIn(fields);
    };

    render(){

        return(
            <div className='mainWrapper text-center'>
                <h2 className = "login_header">LOG IN</h2>
                <form method="post" >
                    <div className='createAccountContent ml-auto mr-auto'>
                        <InputGroup>
                            <Input onChange={this.handleChange} placeholder="Email" name="email" error='test@gmail.com' />
                        </InputGroup>
                        <p className="error">{this.state.errors.email}</p>
                        <InputGroup >
                            <Input onChange={this.handleChange} type="password" placeholder="Password" name="password" error='' />
                        </InputGroup>
                        <span className="error-text">{this.props.userMessage && this.props.userMessage.size > 0 ? this.props.userMessage.toJS().message : ''}</span>
                        <p className="error">{this.state.errors.password}</p>                        
                    </div><br />
                    <Button onClick={this.handleSubmit} color="primary" >LOG IN</Button>
                    <p className = "forget-password-link">Forgot password?</p>
                </form>
                <div className='wrapper-social-networks'>
                    <SocialNetworks />
                </div>
                <div className='footer'>
                    <p className='redirect-to-login'>Not a member? 
                        <Link className="redirect-to-login-link" to='/'>Sign Up.</Link>
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => selector(state, false, ['auth-user']);

const mapDispatchToProps = dispatch => {
    return {
        attemptSignIn: data => dispatch(attemptSignIn(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
