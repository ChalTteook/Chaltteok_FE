import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const MapIcon = (props) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_264_1408)">
      <Path
        d="M19.3333 9.33333V26M19.3333 9.33333L26 6V22.6667L19.3333 26M19.3333 9.33333L12.6667 6M19.3333 26L12.6667 22.6667M12.6667 22.6667L6 26V9.33333L12.6667 6M12.6667 22.6667V6"
        stroke="#202123"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_264_1408">
        <Rect width={32} height={32} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default MapIcon;
