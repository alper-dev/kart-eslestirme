import React from 'react';
import './Card.css';

const Card = ({ id, value, onCardClick, isOpen }) => {
    const handleCardClick = () => {
        if (!isOpen) {
            onCardClick(id, value);
        }
    };

    return (
        <div className={`card ${isOpen ? 'flipped' : ''}`} onClick={handleCardClick}>
            <div className="front">?</div>
            <div className="back">{value}</div>
        </div>
    );
};

export default Card;