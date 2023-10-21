import React, { useEffect, useState } from "react";
import Card from "@/components/card";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);

  const handleCardClick = (id) => {
    if (flippedCards.length === 2) {
      return;
    }
    if (flippedCards.includes(id)) {
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
    if (firstMatchedCard.animal === secondMatchedCard.animal || firstMatchedCard.animal === secondMatchedCard.animal) {
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

  const fetchImages = async () => {
    const response = await fetch("https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20");
    const data = await response.json();
    const images = data.entries.map((image) => {
      return { flipped: false, matched: false, image: image.fields.image.url, animal: image.meta.name };
    });

    const shuffledImages = images.sort(() => 0.5 - Math.random());
    const selectedImages = shuffledImages.slice(0, 9);

    const duplicatedImages = [...selectedImages, ...selectedImages];
    const imagesWithIds = duplicatedImages.map((image, index) => {
      return { ...image, id: index + 1 };
    });

    setCards(imagesWithIds.sort(() => 0.5 - Math.random()));
  }

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="page-container">
      <h1 className="title">Memory Game</h1>
      <div className="memory-game">
        {cards.map((card) => (
          <Card key={card.id} card={card} handleCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}
