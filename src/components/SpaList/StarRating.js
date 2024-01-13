import React from "react";
import Star from "./Star";

export default function StarRating({ totalStars = 5, selectedStars = 0, onRate = (f) => f }) {
  return (
    <>
      {[...Array(totalStars)].map((n, starIdx) => (
        <Star
          key={starIdx}
          selected={selectedStars > starIdx}
          half={starIdx + 1 - selectedStars == 0.5}
          onSelect={(half) => onRate(starIdx + 1 - (half ? 0.5 : 0))}
        />
      ))}
      {/* <p>
        {selectedStars} of {totalStars} stars
      </p> */}
    </>
  );
}
