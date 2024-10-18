import '../css/AfterGameAnimation.css';
import Stats from "./Stats";
import Elo from "./Elo";
import AvatarHolder from "./AvatarHolder";
import {useEffect, useState} from "react";

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
        console.log("trigger")
        updateStatsAfterGame()
    }, [lastMatchId])

    useEffect(() => {
        initPlayerData()
        const interval = setInterval(() => {
            console.log("trigger 1")
            checkLastGame(props.playerId)
        }, 15000);


        return () => clearInterval(interval);
    }, []);
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setLastMatchId(null)
    //         console.log("clearing")
    //     }, 5000);
    //
    //
    //     return () => clearInterval(interval);
    // }, []);

    async function updateStatsAfterGame() {
        const player = await fetchPlayerData(props.playerId)
        const playerTop = await fetch(`https://open.faceit.com/data/v4/rankings/games/cs2/regions/EU/players/${props.playerId}`, {
            headers: {Authorization: 'Bearer d0e81fa3-626f-4fe5-aaf7-a8c1e7f7e3be'}
        }).then((response) => response.json())
        const updatedElo = player.games.cs2.faceit_elo
        setTop(playerTop.position);
        setDiff(elo ? updatedElo - elo : 0)
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
        setTimeout(() => {
            setShow(false)
        }, 9000)
    }

    async function initPlayerData() {
        const playerData = await fetchPlayerData(props.playerId)
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

        setLastMatchId((prev) => {
            return lastGames.items[0].match_id
        })
    }

    return <> {
        elo && top && diff != null && imgSrc ? <div className={ show ? "show aftergame__wrapper" : "hide aftergame__wrapper"}>
            <AvatarHolder show={show} src={imgSrc} country={country} name={name} top={top}/>
            <Elo show={show} elo={elo} diff={diff}/>
            <Stats show={show} stats={stats}/>
        </div> : null} </>
}

export default AfterGameAnimation;