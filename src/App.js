import './App.css';
import Elo from "./Elo";
import Top from "./Top";
import {useEffect, useState} from "react";

function App() {
    const [elo, setElo] = useState(null);
    const [top, setTop] = useState(null);

    const queryParameters = new URLSearchParams(window.location.search)

    const getApiData = async () => {
        const player = await fetch(
            `https://open.faceit.com/data/v4/players?nickname=${queryParameters.get("player")}&game=cs2`, {
                headers: {Authorization: 'Bearer d0e81fa3-626f-4fe5-aaf7-a8c1e7f7e3be'}
            }
        ).then((response) => response.json())
        const playerTop = await fetch(`https://open.faceit.com/data/v4/rankings/games/cs2/regions/EU/players/${player.player_id}`,{
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
            <main>
                <div className="wrapper">
                    <Top top={top}/>
                    <Elo elo={elo}/>
                </div>
            </main>
        </div>
    );
}

// <div className="wrapper wrapper-left">
//     <img id="levelpic"
//          src="https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_10_svg.svg"/>
//     {<div id="elo">
//         {elo}
//     </div>}
// </div>
// <div className="wrapper wrapper-right">
//     <span id="top">#850</span>
//     <svg viewBox="0 0 40 40" fill="#e80128" xmlns="http://www.w3.org/2000/svg" height="40" width="40"
//          className="sc-klVQfs hETIkZ">
//         <g clip-path="url(#clip0_7619_6076__j0OOVxQO)">
//             <path d="M20 40c11.045 0 20 -8.955 20 -20S31.045 0 20 0 0 8.955 0 20s8.955 20 20 20"
//                   fill="#121212"/>
//             <path
//                 d="M11.737 11.288a16.667 16.667 0 0 0 -2.162 -0.625l-0.013 -0.013c-0.25 -0.737 -0.425 -1.475 -0.587 -2.275a15.833 15.833 0 0 1 3.5 -2.525 16.667 16.667 0 0 0 -0.038 2.35c0.675 0.35 1.338 0.763 1.925 1.188 -0.95 0.512 -1.837 1.15 -2.625 1.9m18.688 -0.625c0.25 -0.738 0.425 -1.475 0.588 -2.275a15.833 15.833 0 0 0 -3.5 -2.525c0.062 0.812 0.087 1.575 0.037 2.35 -0.675 0.35 -1.325 0.762 -1.925 1.187a11.667 11.667 0 0 1 2.625 1.9c0.688 -0.25 1.425 -0.475 2.162 -0.625zM34.75 13.8c-0.45 0.65 -0.925 1.263 -1.45 1.838 -0.737 -0.15 -1.5 -0.25 -2.238 -0.288a12 12 0 0 0 -1.65 -2.787 15 15 0 0 1 2.238 -0.325c0.35 -0.688 0.638 -1.4 0.9 -2.163 0.9 1.138 1.637 2.388 2.2 3.725m-0.812 7.55a18.333 18.333 0 0 0 2.062 -1.112 16 16 0 0 0 -0.513 -4.288q-0.803 0.882 -1.7 1.613a15 15 0 0 0 -2.173 -0.613c0.275 1.05 0.4 2.138 0.387 3.225q0.978 0.507 1.938 1.163zm0.6 5.3a16.667 16.667 0 0 1 -2.313 0.188 15 15 0 0 0 -1.313 -1.85 11.667 11.667 0 0 0 0.925 -3.1c0.613 0.425 1.213 0.9 1.75 1.425a13.333 13.333 0 0 0 2.2 -0.8 15.5 15.5 0 0 1 -1.25 4.137zm-3.888 5.288c-0.763 -0.2 -1.5 -0.463 -2.213 -0.775v0.012a13.333 13.333 0 0 0 -0.45 -2.212c0.838 -0.7 1.513 -1.563 2.113 -2.463 0.412 0.65 0.712 1.3 1.025 2.013 0.75 0.087 1.562 0.173 2.337 0.15 -0.8 1.2 -1.712 2.337 -2.812 3.275M12.012 28.95a13.333 13.333 0 0 0 -0.45 2.213v-0.013q-1.068 0.473 -2.212 0.775c-1.1 -0.938 -2.013 -2.075 -2.813 -3.275 0.775 0.025 1.588 -0.05 2.338 -0.15 0.312 -0.713 0.612 -1.363 1.025 -2.013 0.6 0.9 1.287 1.763 2.112 2.463m-4.225 -2.112c0.388 -0.65 0.85 -1.288 1.313 -1.85a10.833 10.833 0 0 1 -0.925 -3.1 13.333 13.333 0 0 0 -1.75 1.425 15 15 0 0 1 -2.2 -0.8c0.2 1.437 0.65 2.825 1.25 4.137 0.795 0.112 1.542 0.187 2.312 0.188m0.213 -6.65c-0.637 0.325 -1.287 0.725 -1.937 1.162v0.013A21.667 21.667 0 0 1 4 20.25a16 16 0 0 1 0.513 -4.287q0.803 0.882 1.7 1.612c0.712 -0.262 1.45 -0.462 2.175 -0.612a11.667 11.667 0 0 0 -0.388 3.225m-1.3 -4.55c0.737 -0.163 1.5 -0.25 2.237 -0.288a12 12 0 0 1 1.65 -2.787 16.667 16.667 0 0 0 -2.237 -0.325 16.667 16.667 0 0 1 -0.9 -2.163A16 16 0 0 0 5.25 13.8c0.45 0.663 0.925 1.275 1.45 1.838m15.033 19.227 2.242 0.867 -0.45 1.165L20 35.535l-3.525 1.362 -0.45 -1.167 2.242 -0.867L13.012 32.833l0.45 -1.167L20 34.195 26.538 31.667l0.45 1.167zm3.34 -21.302c0.055 -0.083 0.19 -0.055 0.19 0.055v11.267c0 0.055 -0.163 0.137 -0.243 0.11 -1.105 -0.433 -2.483 -0.98 -3.985 -1.575a976.667 976.667 0 0 0 -10.068 -3.95c-0.11 -0.053 -0.055 -0.218 0.08 -0.218h10.418c0.632 -1.038 1.333 -2.133 2.337 -3.7z"/>
//         </g>
//     </svg>
// </div>
export default App;
