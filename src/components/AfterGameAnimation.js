import '../css/AfterGameAnimation.css';
import Stats from "./Stats";
import Elo from "./Elo";

function AfterGameAnimation(props) {
    return <div className="fadeWindow">
        <Elo elo={props.elo}/>
        <Stats/>
    </div>
}
export default AfterGameAnimation;