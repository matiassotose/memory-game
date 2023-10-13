import React, { useEffect, useState } from "react";

export default function Home() {
  const [cards, setCards] = useState([
    { id: 1, flipped: false, matched: false },
    { id: 2, flipped: false, matched: false },
    { id: 3, flipped: false, matched: false },
    { id: 4, flipped: false, matched: false },
    { id: 5, flipped: false, matched: false },
    { id: 6, flipped: false, matched: false },
    { id: 7, flipped: false, matched: false },
    { id: 8, flipped: false, matched: false },
    { id: 9, flipped: false, matched: false },
    { id: 10, flipped: false, matched: false },
    { id: 11, flipped: false, matched: false },
    { id: 12, flipped: false, matched: false },
    { id: 13, flipped: false, matched: false },
    { id: 14, flipped: false, matched: false },
    { id: 15, flipped: false, matched: false },
    { id: 16, flipped: false, matched: false },
    { id: 17, flipped: false, matched: false },
    { id: 18, flipped: false, matched: false },
  ]);
  const [flippedCards, setFlippedCards] = useState([]);

  const handleCardClick = (id) => {
    if (flippedCards.length === 2) {
      return;
    }
    const newCards = cards.map((card) => {
      if (card.id === id) {

        return { ...card, flipped: true };
      }
      return card;
    });
    setCards(newCards);
    setFlippedCards((flipped) => [...flipped, id]);
  };

  useEffect(() => {
    if (flippedCards.length < 2) {
      return;
    }
    const firstMatchedCard = cards.find((card) => card.id === flippedCards[0]);
    const secondMatchedCard = cards.find((card) => card.id === flippedCards[1]);
    if (firstMatchedCard.id === secondMatchedCard.id + 9 || firstMatchedCard.id === secondMatchedCard.id - 9) {
      const newCards = cards.map((card) => {
        if (card.id === firstMatchedCard.id || card.id === secondMatchedCard.id) {
          return { ...card, matched: true };
        }
        return card;
      });
      setCards(newCards);
    }
    else {
      setTimeout(() => {
        const newCards = cards.map((card) => {
          if (card.id === firstMatchedCard.id || card.id === secondMatchedCard.id) {
            return { ...card, flipped: false };
          }
          return card;
        });
        setCards(newCards);
        setFlippedCards([]);
      }, 1000);
    }
    setFlippedCards([]);
  }, [flippedCards]);

  return (
    <main className="memory-game">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`memory-card ${card.flipped ? "flip" : ""} ${card.matched ? "match" : ""
            }`}
          onClick={() => handleCardClick(card.id)}
        >
          <div className="front-face">Front</div>
          <div className="back-face">{card.id}</div>
        </div>
      ))}
    </main>
  );
}
