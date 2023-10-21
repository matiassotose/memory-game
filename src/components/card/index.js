import React from 'react';

const Card = ({ card, handleCardClick }) => {
    return (
        <div
            className={`memory-card ${card.flipped ? "flip" : ""} ${card.matched ? "match" : ""
                }`}
            onClick={() => handleCardClick(card.id)}
        >
            <div className="front-face">Front</div>
            <div className="back-face">
                <img src={card.image} alt={card.animal} />
            </div>
        </div>
    );
};

export default Card;
