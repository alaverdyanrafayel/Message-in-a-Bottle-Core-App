// @flow

import { Switch, Route } from 'react-router-dom';
import * as Pages from "../pages";
import * as React from "react";

export default () => {

    return (
        <Switch>
            <Route exact path="/" component={Pages.SignUp} />
            <Route path="/dashboard" component={Pages.Dashboard} />  
            <Route path="/sign-in" component={Pages.SignIn} />              
            <Route path="/auth/:account" component={Pages.SocialLogin} />  
            <Route path="/upload-image" component={Pages.UploadImage} />                                  
        </Switch>
    );
};
