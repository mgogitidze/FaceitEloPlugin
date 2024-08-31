import "../css/Stats.css"
import StatsElement from "./StatsElement";
function Stats() {
    return <ul>
        <StatsElement name={"KILLS"} value={35}/>
        <StatsElement name={"DEATHS"} value={27}/>
        <StatsElement name={"K/D"} value={1.3}/>
        <StatsElement name={"K/R"} value={1}/>
    </ul>
}

export default Stats