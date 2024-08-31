import "../css/Stats.css"
function StatsElement(props) {
    return <li>
        <div className="liElem"> {props.value}</div>
        <div className="liElem">{props.name}</div>
    </li>
}

export default StatsElement