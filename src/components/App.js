import '../css/App.css';
import Elo from "./Elo";
import Top from "./Top";
import {useEffect, useState} from "react";
import AfterGameAnimation from "./AfterGameAnimation";

function App() {
    const [playerId, setPlayerId] = useState(null);

    const queryParameters = new URLSearchParams(window.location.search)
    const mode = queryParameters.get("mode")
    const nickname = queryParameters.get("player")


    const getApiData = async () => {
        if (nickname === null)
            return

        const player = await fetch(
            `https://open.faceit.com/data/v4/players?nickname=${nickname}&game=cs2`, {
                headers: {Authorization: 'Bearer d0e81fa3-626f-4fe5-aaf7-a8c1e7f7e3be'}
            }
        ).then((response) => response.json())

        setPlayerId(player.player_id)
    };

    useEffect(() => {
        console.log("init")
        getApiData()
    }, []);

    return (
        <div className="App">
            {playerId != null ? (<main><AfterGameAnimation playerId={playerId}/>

                {/*// : <div className="wrapper"><Top top={top}/><Elo elo={elo}/></div>*/}
             </main>) : null}
        </div>
    );
}

export default App;
