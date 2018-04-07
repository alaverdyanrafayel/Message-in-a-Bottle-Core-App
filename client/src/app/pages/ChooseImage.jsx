import React from 'react';
import { Row, Col, Button } from 'reactstrap';

import { REQUIRED, NOT_ALLOWED_IMAGE_EXTENSION, LARGE_IMAGE_SIZE } from 'configs/constants';

class ChooseImage extends React.Component{

    state = {
        error: ""
    }

    isValidated = () => {
        if(this.state.error) {
            return false;
        } else if(!this.props.imageFields.get("base64File")) {
            this.setState({ error: REQUIRED("File")});
            return false;
        }
        return true;
    }

    handleFileChange = (event) => {
        const allowedExtensions = ['jpg', 'png', 'bmp', 'gif'];
        const maxSize = 1024 * 1024 * 20;
        const file = event.target.files[0];
        const extension = file.name.split('.').pop();
      
        if (!allowedExtensions.includes(extension)) {
            this.setState({ error: NOT_ALLOWED_IMAGE_EXTENSION });
        } else if(file.size >= maxSize) {
            this.setState({ error: LARGE_IMAGE_SIZE });
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                this.setState({ error: "", file });
                this.props.attemptUploadImage({ base64File: event.target.result, file });
            };
        }
    };

    render(){
        return(
            <div>
                <Row className="image-upload">
                    <Col xs="12">
                        <Row>
                            <Col xs="6">
                                <p className = "new-image-upload">UPLOAD A NEW IMAGE</p>
                                <form className="uploadImage">
                                <div className="choose-file">
                                    Choose File
                                    <input type='file' className="hide_file" onChange={this.handleFileChange} />
                                </div>
                                    <p className = "maximum-size">Maximum size: 20mb</p>                                                        
                                    <p className="error">{this.state.error}</p>
                                    <img src={this.props.imageFields.get("base64File")} />
                                </form>
                            </Col>
                            <Col xs="6" className="right-side-choose-file">
                                <p className = "new-image-upload">IMAGE GUIDLINES</p>
                                <div className="choose-file-container">
                                    <h5 className="choose-file-text"><b>Get Creative</b></h5>
                                    <p className="choose-file-text">We encourage you to be innovative with how you photograph your bottle.  Play up the setting, downplay the setting...remember people are voting!</p>
                                </div>
                                <div className="choose-file-container">
                                    <h5 className="choose-file-text"><b>Be Courteous</b></h5>
                                    <p className="choose-file-text"> We ask that no images that are hateful, include pornography, defamatory or discriminatory speech be uploaded.</p>
                                </div>
                                <div className="choose-file-container">
                                    <h5 className="choose-file-text"><b>Have Fun</b></h5>
                                    <p className="choose-file-text">Who says you can't have fun while doing good.  Remember to support your community by voting for your favorite bottle.</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ChooseImage;
