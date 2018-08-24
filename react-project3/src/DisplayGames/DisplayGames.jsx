import React from 'react';
import "./style.css";

const DisplayGames = (props) => {
    const gamesList = props.displayGames.map((game, i) => {
        return (
            <li key={i}>{game.data.name}</li>
        )
    })
    return (
        <div className="game-display-style">
            <h1>Search Results</h1>
            <ul>
                {gamesList}
            </ul>
        </div>
    )
}

export default DisplayGames;