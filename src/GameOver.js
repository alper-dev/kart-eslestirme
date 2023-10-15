// GameOver.js
import React from 'react';

function GameOver({ onRestart }) {
    return (
        <div className="game-over-screen">
            <button className="restart-button" onClick={onRestart}>
                Yeniden Başlat
            </button>
            <button className="scoreboard-button" onClick={onRestart}>
                Skor Tablosu
            </button>
        </div>
    );
}

export default GameOver;