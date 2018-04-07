import React from 'react';
import StepZilla  from 'react-stepzilla';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { ChooseImage, AddDescription, Finish } from './index';
import { 
    attemptUploadImage, 
    attemptUploadImageDescription,
    attemptSaveBottle
} from '../modules/upload-image/UploadImageActions';
import { selector } from '../services';

export class UploadImage extends React.Component{

    render(){

        const steps =
        [
          { 
              name: 'Choose Photo', 
              component: <ChooseImage 
                imageFields={this.props.imageFields} 
                attemptUploadImage={this.props.attemptUploadImage} 
            /> 
        },
          { 
            name: 'Add Description', 
            component: <AddDescription 
                imageFields={this.props.imageFields} 
                imageErrors={this.props.imageErrors} 
                imageMessage={this.props.imageMessage}
                attemptUploadImageDescription={this.props.attemptUploadImageDescription}
                attemptSaveBottle={this.props.attemptSaveBottle}/> 
        },
          { 
              name: 'Finish', 
              component: <Finish 
                imageFields={this.props.imageFields}/> 
          },          
        ]

        return(
            <div className = "main-wrapper">
                <Row className="image-upload">
                    <Col xs="12">
                        <h2 className = "upload-image-header">UPLOAD <br/><b>YOUR MESSAGE IN A BOTTLE</b></h2>
                        <p className = "upload-image-header-below-text">We'll walk you through these 3 simple steps, and VOILA, <br/>your bottle with up in no time!</p>
                    </Col>
                    <Col xs="12">
                        <div className='step-progress'>
                            <StepZilla steps={steps} isValidated={false} showNavigation={true} backButtonText="Back" nextButtonText="Next" />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => selector(state, false, ['auth-user', 'upload-image']);

const mapDispatchToProps = dispatch => {
    return {
        attemptUploadImage: data => dispatch(attemptUploadImage(data)),
        attemptUploadImageDescription: data => dispatch(attemptUploadImageDescription(data)),
        attemptSaveBottle: data => dispatch(attemptSaveBottle(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);
