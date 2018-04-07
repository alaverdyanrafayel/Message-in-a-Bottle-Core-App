import React from 'react';
import { Row, Col, Button } from 'reactstrap';

class Finish extends React.Component{

    render(){
        return(
            <div>
                <Row className="image-upload">
                    <Col xs="12">
                        <Row>
                            <Col xs="6">
                                <p className = "new-image-upload">YOUR FHOTO HAS BEEN UPLOADED!</p>
                                <div className="social-icons">
                                    <img style={{width: 100 + "px", height: 150 + "px", float:"left"}} src={this.props.imageFields.get("base64File")} />
                                    <div style={{ marginRight: 25 + "px", }}>
                                        <h5>Post on Social Media!</h5>
                                        <div className="icons">
                                            <span className="fb"></span>
                                            <span className="instagram"></span>                                            
                                            <span className="twitter"></span>
                                            <span className="pinterest"></span>
                                            <span className="google"></span>
                                        </div>
                                    </div>
                                    <div>
                                        <h5>Share my bottle!</h5>
                                        <p className="view-bottle"><a href = "">VIEW MY BOTTLE</a></p>                                        
                                    </div>
                                </div>
                            </Col>
                            <Col xs="6" className="right-side-choose-file">
                                <p className = "new-image-upload">GO ONE STEP FURTHER!</p>
                                <div className="choose-file-container">
                                    <h5 className="choose-file-text"><b>Art Saves Lives</b></h5>
                                    <p className="choose-file-text">Help support the underserved youth through donating what you can so they too can have a voice through their creativity.</p>
                                    <p className="choose-file-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim a</p>
                                </div>
                                <Button className="donation">GIVE A DONATION</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Finish;
