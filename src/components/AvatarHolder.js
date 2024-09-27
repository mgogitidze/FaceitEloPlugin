import ReactCountryFlag from "react-country-flag"
import Top from "./Top";

function AvatarHolder(props) {
    return <div className="avatar__wrapper">
        <img className="avatar" src={props.src} alt=""/>
        <div className="name__wrapper">
            {props.country ? <ReactCountryFlag countryCode={props.country} svg/> : null}
            <span className="name">{props.name}</span>
        </div>
        <div className="ranking__wrapper">
            <span style={{fontSize: "0.65em"}}>RANKING</span>
            <Top top={props.top} mode={"dynamic"}/>
        </div>
    </div>
}

export default AvatarHolder