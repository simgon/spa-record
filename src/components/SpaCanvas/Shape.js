import React from "react";
import { Rect, Group, Transformer, Text, Image } from "react-konva";
import useImage from "use-image";
import { SHAPE_TYPE, SHAPE_TYPE_TEXT, SHAPE_COLOR, MIN_SIZE_SHAPE } from "../../constants";

export default function Shape({ shapeProps, isSelected, onSelect, onChange }) {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  const SHAPE_IMG = {
    [SHAPE_TYPE.BATH]: useImage("/img/spa.png"),
    [SHAPE_TYPE.HOT_SPRING]: useImage("/img/ike.png"),
    [SHAPE_TYPE.TREE]: useImage("/img/tree.png"),
    [SHAPE_TYPE.TSUBOYU]: useImage("/img/tsuboyu.png"),
    [SHAPE_TYPE.CHAIR]: useImage("/img/chair.png"),
  };

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // 図形画像
  const ShapeImage = ({ shape, x = 0, y = 0, width, height }) => {
    const [image] = SHAPE_IMG[shape];
    return <Image image={image} x={0} y={0} width={width} height={height} />;
  };

  const OuterShape = () => {
    // 図形画像の有無
    const hasShapeImg = Object.keys(SHAPE_IMG).find((key) => key === shapeProps.shape);

    if (hasShapeImg) {
      return (
        <ShapeImage shape={shapeProps.shape} width={shapeProps.width} height={shapeProps.height} />
      );
    } else if (shapeProps.shape === SHAPE_TYPE.TEXT) {
      return <></>;
    } else {
      return (
        <Rect
          // {...shapeProps}
          x={0}
          y={0}
          width={shapeProps.width}
          height={shapeProps.height}
          stroke="black"
          fill={SHAPE_COLOR[shapeProps.shape] ?? "#22EEEE22"}
          strokeWidth={4}
        />
      );
    }
  };

  return (
    <>
      <Group
        ref={shapeRef}
        // {...shapeProps}
        x={shapeProps.x}
        y={shapeProps.y}
        width={shapeProps.width}
        height={shapeProps.height}
        rotation={shapeProps.rotation}
        draggable={isSelected}
        onClick={onSelect}
        onTap={onSelect}
        onDragMove={(e) => {
          e.target.x(Math.round(e.target.x() / MIN_SIZE_SHAPE) * MIN_SIZE_SHAPE);
          e.target.y(Math.round(e.target.y() / MIN_SIZE_SHAPE) * MIN_SIZE_SHAPE);
        }}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // 図形変更時にscaleが変更されるので、widthとheightに反映してscaleを1に戻す
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
            rotation: node.rotation(),
          });
        }}
      >
        {/* 図形 */}
        <OuterShape />

        {/* テキスト */}
        <Text
          // {...shapeProps}
          text={shapeProps.text ?? SHAPE_TYPE_TEXT[shapeProps.shape]}
          x={0}
          y={0}
          width={shapeProps.width}
          height={shapeProps.height}
          fontSize={25}
          fontStyle="bold"
          fill="black"
          align="center"
          verticalAlign="middle"
          color="black"
        />
      </Group>

      {/* 選択中の場合、図形変形 */}
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          rotateEnabled={true}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 10 || Math.abs(newBox.height) < 10) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}
