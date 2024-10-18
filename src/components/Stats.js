import StatsElement from "./StatsElement";
function Stats(props) {
    return <div className={props.show ? "show__stats stats__wrapper" : "stats__wrapper"}>
        <StatsElement name={"KILLS"} value={props.stats.kills}/>
        <StatsElement name={"DEATHS"} value={props.stats.deaths}/>
        <StatsElement name={"K/D"} value={props.stats.kd}/>
        <StatsElement name={"K/R"} value={props.stats.kr}/>
    </div>
}

export default Stats