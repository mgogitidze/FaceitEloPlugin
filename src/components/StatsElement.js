function StatsElement(props) {
    return <div className="ds">
        <div className="liElem"> {props.value}</div>
        <div className="liElem">{props.name}</div>
    </div>
}

export default StatsElement