// App.js
import React, { useState } from 'react';
import Card from './Card';
import './App.css';
import GameOver from './GameOver';

function App() {

    const cardList = [
        { id: 1, value: 'A', isOpen: false },
        { id: 2, value: 'B', isOpen: false },
        { id: 3, value: 'C', isOpen: false },
        { id: 4, value: 'D', isOpen: false },
        { id: 5, value: 'E', isOpen: false },
        { id: 6, value: 'F', isOpen: false },
        { id: 7, value: 'G', isOpen: false },
        { id: 8, value: 'H', isOpen: false },
        { id: 9, value: 'A', isOpen: false },
        { id: 10, value: 'B', isOpen: false },
        { id: 11, value: 'C', isOpen: false },
        { id: 12, value: 'D', isOpen: false },
        { id: 13, value: 'E', isOpen: false },
        { id: 14, value: 'F', isOpen: false },
        { id: 15, value: 'G', isOpen: false },
        { id: 16, value: 'H', isOpen: false }
    ];

    const [isBoardLocked, setBoardLocked] = useState(false);
    const [cards, setCards] = useState(shuffleArray(cardList));
    const [score, setScore] = useState(0);
    const [openCards, setOpenCards] = useState([]);

    const handleRestart = () => {
        setBoardLocked(false);
        setCards(shuffleArray(cardList.map(c => { return { ...c, isOpen: false }; })));
        setScore(0);
        setOpenCards([]);
    };

    if (score === 80) {
        return <GameOver onRestart={handleRestart} />;
    };

    const handleCardClick = (id, value) => {
        if (isBoardLocked) return;  // Eğer tahta kilitliyse, fonksiyonu hemen sonlandır

        const updatedCards = [...cards];
        const card = updatedCards.find(c => c.id === id);
        card.isOpen = true;

        if (openCards.length === 0) {
            setOpenCards([card]);
        } else {
            setBoardLocked(true); // İki kartın açıldığı anda tahtayı kilitle

            const firstCard = openCards[0];
            if (firstCard.value === value && firstCard.id !== id) {
                setScore(prevScore => prevScore + 10);
                setOpenCards([]);
                setBoardLocked(false);  // Tahtayı tekrar aç
            } else {
                setTimeout(() => {
                    card.isOpen = false;
                    firstCard.isOpen = false;
                    setOpenCards([]);
                    setCards(updatedCards);
                    setBoardLocked(false);  // Tahtayı tekrar aç
                }, 1000);
            }
        }
    };

    function shuffleArray(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    return (
        <div className="App">
            <div className="score-board">Skor: {score}</div>
            <div className="cards-container">
                {cards.map((card, index) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        value={card.value}
                        isOpen={card.isOpen}
                        onCardClick={handleCardClick}
                        className={`card-${index}`}  // Bu satırı ekleyin
                    />
                ))}
            </div>
        </div>
    );
}

export default App;