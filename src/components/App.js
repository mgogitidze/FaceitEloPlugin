import '../css/App.css';
import Elo from "./Elo";
import Top from "./Top";
import {useEffect, useState} from "react";
import AfterGameAnimation from "./AfterGameAnimation";

function App() {
    const [elo, setElo] = useState(null);
    const [top, setTop] = useState(null);

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

        const playerTop = await fetch(`https://open.faceit.com/data/v4/rankings/games/cs2/regions/EU/players/${player.player_id}`, {
            headers: {Authorization: 'Bearer d0e81fa3-626f-4fe5-aaf7-a8c1e7f7e3be'}
        }).then((response) => response.json())

        setElo(player.games.cs2.faceit_elo);
        setTop(playerTop.position);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            getApiData()
        }, 1000);
        return () => clearInterval(interval);
    }, [elo]);

    return (
        <div className="App">
            {nickname === null
                ? null
                : <main>{(mode === "dynamic")
                    ? <AfterGameAnimation elo={elo}/>
                    : <div className="wrapper"><Top top={top}/><Elo elo={elo}/></div>
                } </main>
            }
        </div>
    );
}

export default App;
