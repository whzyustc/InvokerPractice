import React from 'react';
import ReactDOM from 'react-dom';

import {Hello} from "../../component/hello"
import MainCom from "../../component/main"
import "./index.css"

ReactDOM.render(
    <Hello compiler='Typescript' framework="React" />,
    document.getElementById("side")
);

ReactDOM.render(
    <MainCom />,
    document.getElementById('main')
)


