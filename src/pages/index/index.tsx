import React from 'react';
import ReactDOM from 'react-dom';

import SideTab from "@comp_path/sidetab"
import MainCom from "@comp_path/main"
import "./index.css"

ReactDOM.render(
    <SideTab compiler='Typescript' framework="React" />,
    document.getElementById("side")
);

ReactDOM.render(
    <MainCom />,
    document.getElementById('main')
)


