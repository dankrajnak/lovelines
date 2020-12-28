import Colors from "../Styles/colors";
import ColorInterpolate from "color-interpolate";

export type LoveColor = {
  color: string;
  interpolator: (intensity: number) => string;
};

export const NUM_INTENSITIES = 5;

const LOVE_COLORS: LoveColor[] = [
  Colors.red,
  Colors.blue,
  Colors.orange,
  Colors.green,
].map((color) => ({
  color,
  interpolator: ColorInterpolate([Colors.white, color]),
}));

export default LOVE_COLORS;
