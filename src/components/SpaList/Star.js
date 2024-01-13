import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Star({ selected = false, half = false, onSelect = (f) => f }) {
  const handleStarClick = (event) => {
    // アイコン幅の左半分がクリックされたかを判定
    const iconRect = event.target.getBoundingClientRect();
    const clickX = event.clientX - iconRect.left;
    const isLeftHalfClicked = clickX < iconRect.width / 2;
    onSelect(isLeftHalfClicked);
  };

  return (
    <>
      {half ? (
        // 半分選択時の星（半星）
        <FaStarHalfAlt color={"red"} onClick={handleStarClick} />
      ) : selected ? (
        // 選択時の星（全星）
        <FaStar color={"red"} onClick={handleStarClick} />
      ) : (
        // 未選択時の星（空星）
        <FaRegStar color={"red"} onClick={handleStarClick} />
      )}
    </>
  );
}
