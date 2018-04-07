// @flow

import * as React from 'react';
import { clone, cloneDeep, isEqual } from 'lodash';
import { Button, Input, InputGroup } from 'reactstrap';
import { isEmail, isEmpty, isLength, matches } from 'validator';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { selector } from '../services';
import { attemptSignUp, clear } from '../modules/auth-user/AuthUserActions';
import {
    INVALID_EMAIL,
    LENGTH_REQUIRED,
    PASSWORD_MIN_LENGTH,
    REQUIRED
} from 'configs/constants';
import { Link } from 'react-router-dom';
import SocialNetworks from '../../components/SocialNetworks';
import { DASHBOARD } from '../../configs/constants';

const signUpState = {
    fields: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    },
    errors: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }
};

type Props = {
    attemptSignUp: ({fields: Object, errors: Object}) => {}
};

type State = {
    fields: {
        firstName: string,
        lastName: string,
        email: string,
        password: string
    },
    errors: {
        firstName?: string,
        lastName?: string,
        email?: string,
        password?: string
    }
}

export class SignUp extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = cloneDeep(signUpState);
    }

    componentWillUnmount(){
        this.props.clear();
    }

    componentDidMount(){
        const { userMessage } = this.props;
        if(userMessage){
            toast.error(userMessage);
            this.props.clear();
        }
    }

    redirectToDashboard(){
        this.props.history.push(DASHBOARD);
    }    

    componentDidUpdate(prevProps) {
        const { userMessage, loggedInUser } = this.props;
        if (userMessage !== prevProps.userMessage && userMessage) {
            toast.error(userMessage);
        } else if(loggedInUser){
            this.redirectToDashboard();
        }
    }

    validate(name: string, value: any) {
        switch (name) {
                case 'firstName':
                    if (isEmpty(value)) {
                        return REQUIRED('First Name');
                    } else {
                        return '';
                    }
                case 'lastName':
                    if (isEmpty(value)) {
                        return REQUIRED('Last Name');
                    } else {
                        return '';
                    }
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

        const { attemptSignUp } = this.props,
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
        attemptSignUp(fields);
    };

    render() {

        return (
            <div className='mainWrapper text-center'>
                <ToastContainer />
                <h2>PLEASE JOIN <strong>YOUR MESSAGE IN A BOTTLE</strong> TO CONTINUE</h2>
                <p>Join our community to share your bottle design, vote for your favourite and keep up to date with the latest news and events.</p>
                <form method="post" >
                    <div className='createAccountContent ml-auto mr-auto'>
                        <InputGroup>
                            <Input onChange={this.handleChange} placeholder="First Name" name="firstName"/>
                        </InputGroup>
                        <p className='error'>{this.state.errors.firstName}</p>
                        <InputGroup>
                            <Input onChange={this.handleChange} placeholder="Last Name" name="lastName"/>
                        </InputGroup>
                        <p className='error'>{this.state.errors.lastName}</p>
                        <InputGroup>
                            <Input onChange={this.handleChange} placeholder="Email" name="email" error='test@gmail.com' />
                        </InputGroup>
                        <p className='error'>{this.state.errors.email}</p>                        
                        <InputGroup >
                            <Input type="password" onChange={this.handleChange} placeholder="Password" name="password" error='' />
                        </InputGroup>
                        <p className='error'>{this.state.errors.password}</p>                        
                    </div>
                    <Button color="primary" onClick={this.handleSubmit} >JOIN NOW</Button>
                </form>
                <div className='wrapper-social-networks'>
                   <SocialNetworks />
                </div>
                <div className='footer'>
                    <p className='redirect-to-login'>Already signed up? 
                        <Link className="redirect-to-login-link" to='/sign-in'>Log in.</Link>
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => selector(state, false, ['auth-user']);

const mapDispatchToProps = dispatch => {
    return {
        attemptSignUp: data => dispatch(attemptSignUp(data)),
        clear: data => dispatch(clear()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
