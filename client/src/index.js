// @flow

import {render} from "react-dom";
import App from "./app/App";

const appElement = document.getElementById("app");
if(appElement){
    render(
        App(),
        appElement
    );
}
