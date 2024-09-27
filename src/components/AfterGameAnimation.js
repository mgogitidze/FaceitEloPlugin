import '../css/AfterGameAnimation.css';
import Stats from "./Stats";
import Elo from "./Elo";
import AvatarHolder from "./AvatarHolder";
import {useEffect, useState} from "react";
import {update} from "@react-spring/web";

function AfterGameAnimation(props) {
    const [lastMatchId, setLastMatchId] = useState(null)
    const [stats, setStats] = useState({Kills: null, Deaths: null})
    const [show, setShow] = useState(true)
    const [name, setName] = useState(null)
    const [country, setCountry] = useState(null)
    const [elo, setElo] = useState(null)
    const [diff, setDiff] = useState(null)
    const [top, setTop] = useState(null)
    const [imgSrc, setImgSrc] = useState(null)

    useEffect(() => {
        updateStatsAfterGame()
    }, [lastMatchId])

    useEffect(() => {
        initPlayerData()
        const interval = setInterval(() => {
            checkLastGame(props.playerId)
        }, 10000);


        return () => clearInterval(interval);
    }, []);

    async function updateStatsAfterGame() {
        const player = await fetchPlayerData(props.playerId)
        const playerTop = await fetch(`https://open.faceit.com/data/v4/rankings/games/cs2/regions/EU/players/${props.playerId}`, {
            headers: {Authorization: 'Bearer d0e81fa3-626f-4fe5-aaf7-a8c1e7f7e3be'}
        }).then((response) => response.json())
        const updatedElo = player.games.cs2.faceit_elo
        setTop(playerTop.position);
        setDiff(-100)
        setElo(updatedElo)

        const statsResponse = await fetch(`https://open.faceit.com/data/v4/players/${props.playerId}/games/cs2/stats?limit=1`, {
            headers: {Authorization: 'Bearer d0e81fa3-626f-4fe5-aaf7-a8c1e7f7e3be'}
        }).then((response) => response.json())

        const playerStats = statsResponse.items[0].stats
        setStats({
            kills: playerStats["Kills"],
            deaths: playerStats["Deaths"],
            kd: playerStats["K/D Ratio"],
            kr: playerStats["K/R Ratio"]
        })
        setShow(true)
    }

    async function initPlayerData() {
        const playerData = await fetchPlayerData(props.playerId)
        console.log("INITA")
        console.log(playerData)
        setImgSrc(playerData.avatar)
        setCountry(playerData.country)
        setName(playerData.nickname)
        setElo(playerData.games.cs2.faceit_elo)
    }

    async function fetchPlayerData(playerId) {
        const player = await fetch(
            `https://open.faceit.com/data/v4/players/${playerId}`, {
                headers: {Authorization: 'Bearer d0e81fa3-626f-4fe5-aaf7-a8c1e7f7e3be'}
            }
        ).then((response) => response.json())
        return player
    }

    async function checkLastGame(playerId) {
        if (playerId === null)
            return
        const lastGames = await fetch(`https://open.faceit.com/data/v4/players/${playerId}/history`, {
            headers: {Authorization: 'Bearer d0e81fa3-626f-4fe5-aaf7-a8c1e7f7e3be'}
        }).then((response) => response.json())
        setLastMatchId(lastGames.items[0].match_id)
    }

    return <> {
        show && elo && top && diff ? <div className="aftergame__wrapper">
            <AvatarHolder src={imgSrc} country={country} name={name} top={top}/>
            <Elo elo={elo} diff={diff}/>
            <Stats stats={stats}/>
        </div> : null} </>
}

export default AfterGameAnimation;