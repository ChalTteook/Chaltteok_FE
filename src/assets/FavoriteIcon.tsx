import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const FavoriteIcon = (props) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_264_1402)">
      <Path
        d="M25.8997 7.60027C27.9619 9.66246 28.0409 12.9808 26.0791 15.1387L16.2493 25.9506L6.42083 15.1387C4.45906 12.9807 4.53806 9.66239 6.60025 7.6002C8.90281 5.29764 12.695 5.50804 14.7292 8.05079L16.25 9.95113L17.7695 8.05057C19.8037 5.50782 23.5972 5.29771 25.8997 7.60027Z"
        stroke="#202123"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_264_1402">
        <Rect width={32} height={32} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default FavoriteIcon;
