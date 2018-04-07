// @flow

import React from 'react';
import { INSTAGRAM_URL, FACEBOOK_URL } from 'configs/constants';

export default class SocialNetworks extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
    }

    render() {
        return(
            <div className='signUp-social-networks'>
                <div className="social-network-link">
                    <a href={FACEBOOK_URL}>
                        <i className='fa fa-facebook' />
                        SIGN UP WITH FACEBOOK
                    </a>
                </div>
                <div className="social-network-link">
                    <a href = {INSTAGRAM_URL}>
                        <i className='fa fa-instagram' />
                        SIGN UP WITH INSTAGRAM
                    </a>
                </div>                   
            </div>
        );
    }
}
