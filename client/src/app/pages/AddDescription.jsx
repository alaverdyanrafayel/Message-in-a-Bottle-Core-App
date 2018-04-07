import React, { Fragment } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { cloneDeep, isEqual } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import { isEmpty } from 'validator';

import { REQUIRED, LARGE_MESSAGE, BOTTLE_UPLOADED_SUCCESSFULLY } from 'configs/constants';
import countries from './Countries';

class AddDescription extends React.Component{
    constructor(props){
        super(props);
        const { imageFields, imageErrors } = props;
        this.state = cloneDeep({ fields: imageFields.toJS(), errors: imageErrors.toJS() });
    }

    componentWillReceiveProps(nextProps) {
        const imageMessage = nextProps.imageMessage;
        if(imageMessage !== BOTTLE_UPLOADED_SUCCESSFULLY && imageMessage){
            toast.error(imageMessage);
        }else if(imageMessage === BOTTLE_UPLOADED_SUCCESSFULLY){
            this.props.jumpToStep(2);
        }
    }

    handleChange = ({ target: { value, name } }) => {
        let newState = cloneDeep(this.state);
        
        newState.errors[name] = this.validate(name, value);
        newState.fields[name] = value;
        
        if (!isEqual(this.state, newState)) {
            this.setState(newState);
        }
    };

    isValidated = () => {
        const fields = cloneDeep(this.state.fields);
        let validationErrors = {};
        Object.keys(fields).map(name => {
            const error = this.validate(name, fields[name]);
            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });
        if (Object.keys(validationErrors).length > 0) {
            this.setState({ errors: validationErrors });

            return false;
        }

        this.props.attemptSaveBottle({ fields });
        return false;
    };
    componentWillUnmount = () => {
        const { attemptUploadImageDescription } = this.props;
        const { fields, errors } = this.state;
        attemptUploadImageDescription({ fields, errors })
    }

    validate(name, value) {
        switch (name) {
            case 'firstName':
                if (isEmpty(value)) {
                    return REQUIRED('First Name');
                } else {
                    return '';
                }
            case 'lastName':
                if (isEmpty(value)) {
                    return REQUIRED('Last name');
                } else {
                    return '';
                }
            case 'country':
                if (isEmpty(value)) {
                    return REQUIRED('Country');
                } else {
                    return '';
                }
            case 'city':
                if (isEmpty(value)) {
                    return REQUIRED('City');
                } else {
                    return '';
                }
            case 'state':
                if (isEmpty(value)) {
                    return REQUIRED('State');
                } else {
                    return '';
                }
            case 'title':
                if (isEmpty(value)) {
                    return REQUIRED('Title');
                } else {
                    return '';
                }
            case 'message':
                if (isEmpty(value)) {
                    return REQUIRED('message');
                } else if(this.state.fields.message.length>200){
                    return LARGE_MESSAGE;
                }else {
                    return '';
                }
        }
    }

    render(){
        const { fields, errors } = this.state;
        return(
            <div>
                 <ToastContainer />
                 <Row className="image-upload">
                    <Col xs="12">
                        <Row>
                            <Col xs="6">
                                 <img style={{width: 300 + "px", height: 400 + "px"}} src={this.props.imageFields.get("base64File")} />
                            </Col>
                            <Col xs="6" className="right-side-add-documentation">
                                <Row>
                                    <form>
                                        <FormGroup>
                                            <Label><b>Artist's Name*</b></Label>
                                            <Col xs="12">
                                                <Row>
                                                    <Input type="text" value={fields.firstName} onChange={this.handleChange} name="firstName" placeholder="First" style={{width: 170 + "px", marginRight: 15 + "px"}} />  
                                                    <Input type="text"  value={fields.lastName} onChange={this.handleChange} name="lastName" placeholder="Last" style={{width: 170 + "px"}} />
                                                    <div className="firstLastErrors">
                                                        <p className="error">{errors.firstName}</p>
                                                        <p className="error error-right lName">{errors.lastName}</p>         
                                                    </div>                                           
                                                </Row>
                                            </Col><br/>
                                            <Label><b>Age</b> (optional)</Label>
                                            <Col xs="12">
                                                <Row>
                                                    <Input type="number" value={fields.age} onChange={this.handleChange} name="age" placeholder="Age" style={{width: 170 + "px"}} />  
                                                </Row>
                                            </Col><br/>
                                            <Label><b>Where are you uploading your bottom<br/>from?*</b></Label>
                                            <Col xs="12">
                                                <Row>
                                                    <Input type="select" name="country" id="exampleSelect" value={fields.country} onChange={this.handleChange}>
                                                    <option disabled value=''>Select Country</option>
                                                    {
                                                        countries.map((country, index) => {
                                                            return (  
                                                                    <option key={index} value={country.name}>{country.name}</option>
                                                            )
                                                        })
                                                    }
                                                    </Input>
                                                    <p className="error">{errors.country}</p>  
                                                </Row><br/>
                                                <Row>
                                                    <Input type="text" value={fields.city} onChange={this.handleChange} name="city" placeholder="City" style={{width: 170 + "px", marginRight: 15 + "px"}} />  
                                                    <Input type="text" value={fields.state} onChange={this.handleChange} name="state" placeholder="State" style={{width: 170 + "px"}} />  
                                                    <p className="error">{errors.city}</p>  
                                                    <p className="error error-right">{errors.state}</p>                                                                                                              
                                                </Row>
                                            </Col><br/>
                                            <Label><b>Title of bottle*</b></Label>
                                            <Col xs="12">
                                                <Row>
                                                    <Input value={fields.title} onChange={this.handleChange} type="text" name="title" />  
                                                    <p className="error">{this.state.errors.title}</p> 
                                                </Row>
                                            </Col><br/>
                                            <Label><b>What is your message in a bottle?*</b><br/>(200 characters only)</Label>
                                            <Col xs="12">
                                                <Row>
                                                    <Input value={fields.message} onChange={this.handleChange} type="textarea" name="message" id="exampleText" /> 
                                                    <p className="error">{this.state.errors.message}</p>  
                                                </Row>
                                            </Col>
                                        </FormGroup>
                                    </form>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AddDescription;

