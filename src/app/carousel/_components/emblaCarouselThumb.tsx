import React from "react";
import "../_components/embla.css";
import Image from "next/image";

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  image: string; // Añadido para la URL de la imagen
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, image } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__button"
      >
        <Image
          src={image}
          alt={`Thumbnail ${index + 1}`}
          width={500}
          height={500}
          className="embla-thumbs__slide__img"
        />
      </button>
    </div>
  );
};
