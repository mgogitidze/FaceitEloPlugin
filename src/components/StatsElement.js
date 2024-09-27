function StatsElement(props) {
    return <div className="ds">
        <div className="ds_element"> {props.value}</div>
        <div className="ds_element">{props.name}</div>
    </div>
}

export default StatsElement