import React from "react";
import { Line } from "react-konva";

// 方眼紙のグリッド線を描画
export default function GridPaper({ gridSize = 50, stageWidth = 4500, stageHeight = 3000 }) {
  const generateGridLines = () => {
    const lines = [];

    // 縦線を描画
    for (let x = 0; x <= stageWidth; x += gridSize) {
      lines.push(
        <Line
          key={`vertical_${x}`}
          points={[x, 0, x, stageHeight]}
          stroke={x % (gridSize * 5) === 0 ? "#CCC" : "#EEE"}
        />
      );
    }

    // 横線を描画
    for (let y = 0; y <= stageHeight; y += gridSize) {
      lines.push(
        <Line
          key={`horizontal_${y}`}
          points={[0, y, stageWidth, y]}
          stroke={y % (gridSize * 5) === 0 ? "#CCC" : "#EEE"}
        />
      );
    }

    return lines;
  };

  return (
    <>
      {/* 方眼紙のグリッド線 */}
      {generateGridLines()}
    </>
  );
}
