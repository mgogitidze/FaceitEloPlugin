import React from "react";
import {useSpring, animated} from "@react-spring/web"

export default function Elo(props) {
    const {number} = useSpring({
        from: {number: props.elo},
        number: props.elo + props.diff,
        delay: 3000,
        config: { mass: 1, tension: 170, friction: 26 }
    })

    return <div style={{margin: "25px 0 50px 0px"}}>
        <div id="elo-wrapper">
            <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
            <div id="elop">ELO</div>
        </div>
        <div style={{color: Math.sign(props.diff) === -1 ? "red" : "green"}} className="diff__wrapper">
            <div>{props.diff}</div>
            <div>ELO</div>
        </div>
    </div>
}

