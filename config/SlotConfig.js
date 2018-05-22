import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const DEVICE_HEIGHT = height;
const DEVICE_WIDTH = width;

const TILE_SIZE = DEVICE_WIDTH * 0.28;
const TILE_SHADOW_DEPTH = 6;
const TILE_BORDER_RADIUS = TILE_SIZE * 0.1;

const BOARD_MARGIN = 20;
const BOARD_HEIGHT = DEVICE_HEIGHT * 0.96;
const BOARD_WIDTH = DEVICE_WIDTH;

export default {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  TILE_SIZE,
  TILE_SHADOW_DEPTH,
  TILE_BORDER_RADIUS,
  BOARD_MARGIN,
  BOARD_HEIGHT,
  BOARD_WIDTH
};
