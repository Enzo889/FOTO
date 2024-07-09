"use client";
import { Meteors } from "@/components/ui/meteors";
import { UnsplashImagesRandom } from "@/utils/data";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import React, { useState } from "react";

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
}

function CardRotate({ children, onSendToBack }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: any, info: PanInfo) {
    const threshold = 180;
    if (
      Math.abs(info.offset.x) > threshold ||
      Math.abs(info.offset.y) > threshold
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute h-72 w-52 cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export default function SwipeableStackCards() {
  const initialCards = [
    {
      id: 1,
      z: 4,
      img: "https://i.pinimg.com/564x/8c/e3/5f/8ce35f08a33293522c4d60cbc5e642be.jpg",
      info: "Mia, an aspiring actress, and Sebastian, a jazz musician, meet and fall in love in Los Angeles while pursuing their professional dreams. The film follows their love story as they try to balance their relationship with their individual ambitions, highlighting the struggle between love and success.",
      title: "La La Land (2016)",
      director: "Damien Chazelle",
      genre: "Musical, Drama, Romance",
      duration: "128 minutes",
      cast: "Ryan Gosling, Emma Stone, John Legend",
    },
    {
      id: 2,
      z: 3,
      img: "https://i.pinimg.com/564x/7d/f4/a6/7df4a612f61844deee84ef633da2d1f0.jpg",
      info: "The epic love story of Jack and Rose, two young people from different social classes who meet and fall in love aboard the Titanic, the famed ocean liner that sinks after hitting an iceberg on its maiden voyage in 1912. Their romance unfolds amidst the tragedy, leaving an indelible mark on both.",
      title: "Titanic (1997)",
      director: "James Cameron",
      genre: "Drama, Romance, Historical",
      duration: "195 minutes",
      cast: "Leonardo DiCaprio, Kate Winslet, Billy Zane",
    },
    {
      id: 3,
      z: 2,
      img: "https://i.pinimg.com/564x/0e/e3/2b/0ee32bdb7a557417c8d4d2bfffff28a1.jpg",
      info: "John Wick, a retired hitman, is forced back into the world of crime when a young thug steals his car and kills his dog, a final gift from his late wife. Unleashing a wave of vengeance, Wick proves that he remains one of the most feared men in the criminal underworld.",
      title: "John Wick (2014)",
      director: "Chad Stahelski",
      genre: "Action, Thriller",
      duration: "101 minutes",
      cast: "Keanu Reeves, Michael Nyqvist, Alfie Allen",
    },
    {
      id: 4,
      z: 1,
      img: "https://i.pinimg.com/564x/38/30/4e/38304e7e23148938653c361465f33407.jpg",
      info: "In the near future, a weary Logan cares for an ailing Professor X in a remote hideout on the Mexican border. Their attempts to hide from the world and their past are upended when a young mutant very much like Logan arrives, being pursued by dark forces. Logan must confront his destiny and accept the responsibility of protecting her.",
      title: "Logan (2017)",
      director: "James Mangold",
      genre: "Action, Science Fiction, Drama",
      duration: "137 minutes",
      cast: "Hugh Jackman, Patrick Stewart, Dafne Keen",
    },
    {
      id: 5,
      z: 0,
      img: "https://i.pinimg.com/564x/21/17/af/2117afc8941d8c9f8f60bf3bd1fbb9fd.jpg",
      info: "Patrick Bateman is a young and successful investment banker in New York City during the 1980s. However, beneath his impeccable exterior lies a psychopathic and sadistic nature. As his insatiable thirst for violence grows, Bateman struggles to keep his double life a secret, taking the viewer on a dark and disturbing journey through his mind.",
      title: "American Psycho (2000)",
      director: "Mary Harron",
      genre: "Horror, Thriller, Drama",
      duration: "102 minutes",
      cast: "Christian Bale, Willem Dafoe, Jared Leto",
    },
  ];
  const [cards, setCards] = useState(initialCards);
  const [selectedCard, setSelectedCard] = useState(initialCards[0]);

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
    const foundCard = cards.find((card) => card.id === id);
    if (foundCard) {
      setSelectedCard(foundCard);
    }
  };

  return (
    <div className="flex flex-row-reverse justify-center gap-24 ">
      <div className="w-full max-w-xs p-4 relative">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
            {selectedCard.title}
          </h1>
          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
            <span className="font-bold text-slate-400/80">Director:</span>{" "}
            {selectedCard.director}
          </p>
          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
            <span className="font-bold text-slate-400/80">Genre:</span>{" "}
            {selectedCard.genre}
          </p>
          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
            <span className="font-bold text-slate-400/80">Duration:</span>{" "}
            {selectedCard.duration}
          </p>
          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
            <span className="font-bold text-slate-400/80">Cast: </span>{" "}
            {selectedCard.cast}
          </p>
          <details>
            <summary className=" cursor-pointer font-normal text-base text-slate-500 mb-4 relative z-50 hover:text-slate-400 transition-colors duration-300">
              Sypnopsis:
            </summary>
            <p className="font-normal text-base text-slate-500 text-pretty ">
              {selectedCard.info}
            </p>
          </details>

          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
      </div>
      <div
        className="relative h-52 w-52 ml-24  max-md:ml-3"
        style={{ perspective: 600 }}
      >
        {cards.map((card, index) => {
          return (
            <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)}>
              <motion.div
                className="h-full w-full rounded-lg"
                animate={{
                  rotateZ: (cards.length - index - 1) * 4,
                  scale: 1 + index * 0.06 - cards.length * 0.06,
                  transformOrigin: "90% 90%",
                }}
                initial={false}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <img
                  src={card.img}
                  alt="card"
                  className="pointer-events-none h-full w-full rounded-lg object-cover"
                />
              </motion.div>
            </CardRotate>
          );
        })}
      </div>
    </div>
  );
}
