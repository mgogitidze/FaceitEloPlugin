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
        <div className={props.show ? "show__elo elo__wrapper" : "elo__wrapper"}>
            <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
            <div>ELO</div>
        </div>
        <div className={props.show ? "show__diff diff__wrapper" : "diff__wrapper"} style={{color: Math.sign(props.diff) === -1 ? "red" : "green"}}>
            <div style={{position: "relative", top: "-3px", left: "2px"}}>{Math.sign(props.diff) === -1 ? null : "+"}</div>
            <div style={{marginRight: "3px", marginLeft: "2px"}}>{props.diff}</div>
            <div>ELO</div>
        </div>
    </div>
}

