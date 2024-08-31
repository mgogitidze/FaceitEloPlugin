import '../css/Elo.css';
import React from "react";

export default function Elo(props) {

    return <div id="elo-wrapper">
        <div id="elo">{props.elo} </div>
        <div id="elop">ELO</div>
    </div>
}

