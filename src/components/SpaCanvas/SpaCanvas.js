import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Stage, Layer } from "react-konva";
import { SHAPE_TYPE, SHAPE_TYPE_TEXT, ALL_TYPE, MIN_SIZE_SHAPE } from "../../constants";
import GridPaper from "./GridPaper";
import Shape from "./Shape";

export default function CustomCanvas({ record, onUpdateRecord = (f) => f }) {
  const [shapes, setShapes] = React.useState(record.canvas ?? []);
  const [selectedOperation, setSelectedOperation] = useState(ALL_TYPE.SELECTION);
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [scale, setScale] = useState(0.5);

  const [drawing, setDrawing] = useState(false);
  const drawingRef = useRef(null);

  const canvasRef = React.useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(0);

  // 初期表示時
  useEffect(() => {
    // リサイズ時
    const handleResize = () => {
      setCanvasWidth(canvasRef.current.offsetWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 図形作成時
  useEffect(() => {
    // マウスカーソルの変更
    if (drawingRef.current) {
      const stage = drawingRef.current.getStage();
      stage.container().style.cursor = drawing ? "crosshair" : "default";
    }
  }, [drawing]);

  useEffect(() => {
    // レコード情報を更新
    onUpdateRecord({ ...record, canvas: shapes });
  }, [shapes]);

  // 図形を作成
  const createShape = (text, shape, x, y, width, height) => {
    return {
      id: `shape-${uuidv4()}`,
      text,
      shape,
      x,
      y,
      width,
      height,
      rotation: 0,
    };
  };

  // マウスダウン時
  const handleMouseDown = (e) => {
    if (Object.values(SHAPE_TYPE).includes(selectedOperation)) {
      // 図形作成開始
      setDrawing(true);
      const stage = e.target.getStage();
      const position = stage.getPointerPosition();

      const x = Math.round((position.x - stage.x()) / scale / MIN_SIZE_SHAPE) * MIN_SIZE_SHAPE;
      const y = Math.round((position.y - stage.y()) / scale / MIN_SIZE_SHAPE) * MIN_SIZE_SHAPE;
      const width = MIN_SIZE_SHAPE;
      const height = MIN_SIZE_SHAPE;

      const creatingShape = createShape(
        SHAPE_TYPE_TEXT[selectedOperation] ?? "",
        selectedOperation,
        x,
        y,
        width,
        height
      );
      setShapes([...shapes, creatingShape]);

      // 作成した図形を選択
      setSelectedShapeId(creatingShape.id);
    } else {
      // 図形を未選択にする
      deselectShape(e);
    }
  };

  // マウス移動時
  const handleMouseMove = (e) => {
    if (!drawing) return;

    // 図形作成中
    const stage = e.target.getStage();
    const position = stage.getPointerPosition();

    let creatingShape = shapes[shapes.length - 1];
    let { x, y } = creatingShape;
    const endX = (position.x - stage.x()) / scale;
    const endY = (position.y - stage.y()) / scale;
    let width = Math.round((endX - x) / MIN_SIZE_SHAPE) * MIN_SIZE_SHAPE;
    let height = Math.round((endY - y) / MIN_SIZE_SHAPE) * MIN_SIZE_SHAPE;

    if (width < MIN_SIZE_SHAPE) width = MIN_SIZE_SHAPE;
    if (height < MIN_SIZE_SHAPE) height = MIN_SIZE_SHAPE;

    setShapes([...shapes.slice(0, shapes.length - 1), { ...creatingShape, x, y, width, height }]);
  };

  // マウスアップ時
  const handleMouseUp = () => {
    // 図形作成終了
    setDrawing(false);
    setSelectedOperation(ALL_TYPE.SELECTION);
  };

  // Stageをクリックした場合、図形を未選択にする
  const deselectShape = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedShapeId(null);
    }
  };

  // 図形の種類を変更
  const switchShape = (newShape) => {
    setSelectedOperation(newShape);
  };

  // 図形を最前面または最背面に移動
  const sendToFrontOrBack = (front = true) => {
    if (!selectedShapeId) return;
    const newShapes = shapes.slice();
    const selectedShape = newShapes.find((shape) => shape.id === selectedShapeId);
    const index = newShapes.indexOf(selectedShape);
    newShapes.splice(index, 1);
    if (front) {
      newShapes.push(selectedShape);
    } else {
      newShapes.unshift(selectedShape);
    }
    setShapes(newShapes);
  };

  // 選択中の図形を削除
  const clearShape = () => {
    if (!selectedShapeId) return;
    const newShapes = shapes.filter((shape) => shape.id !== selectedShapeId);
    setShapes(newShapes);
    setSelectedShapeId(null);
  };

  // 操作ボタン
  const OperationComponent = () => {
    // 操作
    const operations = {
      [ALL_TYPE.SELECTION]: "選択",
      [SHAPE_TYPE.AREA]: "枠組",
      [SHAPE_TYPE.BATH]: "風呂",
      [SHAPE_TYPE.HOT_SPRING]: "露天",
      [SHAPE_TYPE.TSUBOYU]: "壺湯",
      [SHAPE_TYPE.WASHING]: "洗い場",
      [SHAPE_TYPE.SAUNA]: "サウナ",
      [SHAPE_TYPE.WATER]: "水風呂",
      [SHAPE_TYPE.FRESH_AIR]: "外気浴",
      [SHAPE_TYPE.CHAIR]: "椅子",
      [SHAPE_TYPE.TREE]: "木",
      [SHAPE_TYPE.TEXT]: "テキスト",
    };

    return (
      <>
        {/* 操作ボタン */}
        {Object.entries(operations).map(([type, label]) => (
          <button
            key={type}
            onClick={() => switchShape(type)}
            style={{ backgroundColor: selectedOperation === type ? "white" : "gray" }}
          >
            {label}
          </button>
        ))}
        <span className="me-3" />
        <button onClick={() => clearShape()}>削除</button>
        <button onClick={() => setScale(scale < 2.0 ? scale * 1.1 : scale)}>+</button>
        <button onClick={() => setScale(scale > 0.2 ? scale * 0.9 : scale)}>-</button>
        <button onClick={() => sendToFrontOrBack(true)}>最前面</button>
        <button onClick={() => sendToFrontOrBack(false)}>最背面</button>

        {/* 図形テキスト編集 */}
        <input
          type="text"
          value={shapes.find((shape) => shape.id === selectedShapeId)?.text ?? ""}
          onChange={(e) => {
            const newShapes = shapes.slice();
            const selectedShape = newShapes.find((shape) => shape.id === selectedShapeId);
            selectedShape.text = e.target.value;
            setShapes(newShapes);
          }}
          disabled={!selectedShapeId}
        />
      </>
    );
  };

  return (
    <div ref={canvasRef}>
      <span>浴室内図</span>

      {/* 操作ボタン */}
      <OperationComponent />

      {/* キャンバス */}
      <Stage
        ref={drawingRef}
        width={canvasWidth}
        height={500}
        scaleX={scale}
        scaleY={scale}
        className="border"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {/* 背景（方眼紙） */}
          <GridPaper />

          {/* 図形 */}
          {shapes.map((shape, i) => {
            return (
              <Shape
                key={i}
                shapeProps={shape}
                isSelected={shape.id === selectedShapeId}
                onSelect={() => {
                  setSelectedShapeId(shape.id);
                }}
                onChange={(newShape) => {
                  const newShapes = shapes.map((shape) => {
                    if (shape.id === newShape.id) {
                      return {
                        ...shape,
                        x: Math.round(newShape.x / MIN_SIZE_SHAPE) * MIN_SIZE_SHAPE,
                        y: Math.round(newShape.y / MIN_SIZE_SHAPE) * MIN_SIZE_SHAPE,
                        width: Math.round(newShape.width / MIN_SIZE_SHAPE) * MIN_SIZE_SHAPE,
                        height: Math.round(newShape.height / MIN_SIZE_SHAPE) * MIN_SIZE_SHAPE,
                        rotation: Math.round(newShape.rotation / 15) * 15,
                      };
                    }
                    return shape;
                  });

                  setShapes(newShapes);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}
