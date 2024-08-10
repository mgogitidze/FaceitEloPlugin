import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [elo, setElo] = useState(0);
    const getApiData = async () => {
        const response = await fetch(
            "https://open.faceit.com/data/v4/players?nickname=m3wsu&game=cs2", {
                headers: {Authorization: 'Bearer d0e81fa3-626f-4fe5-aaf7-a8c1e7f7e3be'}
            }
        ).then((response) => response.json());
        console.log(response)
        setElo(response.games.cs2.faceit_elo);
    };
    useEffect(() => {
        getApiData();
    }, []);
    return (
        <div className="App">
            <main>
                <div id="wrapper">
                    <img id="levelpic"
                         src="https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_10_svg.svg"/>
                    {<div id="elo">
                        {elo}
                    </div>}
                </div>


            </main>
        </div>
    );
}

export default App;
