// 図形の種類
export const SHAPE_TYPE = {
  AREA: "area",
  BATH: "bath",
  WASHING: "washing",
  SAUNA: "sauna",
  WATER: "water",
  FRESH_AIR: "fresh_air",
  HOT_SPRING: "hot_spring",
  TREE: "tree",
  TSUBOYU: "tsuboyu",
  CHAIR: "chair",
  TEXT: "text",
  WALK: "walk",
};

export const ALL_TYPE = {
  ...SHAPE_TYPE,
  SELECTION: "selection",
};

export const SHAPE_TYPE_TEXT = {
  [SHAPE_TYPE.AREA]: "",
  [SHAPE_TYPE.BATH]: "風呂",
  [SHAPE_TYPE.WASHING]: "洗い場",
  [SHAPE_TYPE.SAUNA]: "サウナ",
  [SHAPE_TYPE.WATER]: "水風呂",
  [SHAPE_TYPE.FRESH_AIR]: "外気浴",
  [SHAPE_TYPE.HOT_SPRING]: "",
  [SHAPE_TYPE.TREE]: "",
  [SHAPE_TYPE.TSUBOYU]: "",
  [SHAPE_TYPE.CHAIR]: "",
  [SHAPE_TYPE.TEXT]: "テキスト",
  [SHAPE_TYPE.WALK]: "",
};

export const SHAPE_COLOR = {
  [SHAPE_TYPE.AREA]: "#DDDDDDBB",
  [SHAPE_TYPE.BATH]: "#FFA500BB",
  [SHAPE_TYPE.WASHING]: "#AAAAFFBB",
  [SHAPE_TYPE.SAUNA]: "#FF0000BB",
  [SHAPE_TYPE.WATER]: "#0000FFBB",
  [SHAPE_TYPE.FRESH_AIR]: "#00FF00BB",
};

// 図形の最小サイズ
export const MIN_SIZE_SHAPE = 25;
