import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const ProfileIcon = (props) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_264_1405)">
      <Path
        d="M25 25C25 21.9318 20.9706 19.4444 16 19.4444C11.0294 19.4444 7 21.9318 7 25M16 16.1111C12.8934 16.1111 10.375 13.6238 10.375 10.5556C10.375 7.48731 12.8934 5 16 5C19.1066 5 21.625 7.48731 21.625 10.5556C21.625 13.6238 19.1066 16.1111 16 16.1111Z"
        stroke="#202123"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_264_1405">
        <Rect width={32} height={32} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ProfileIcon;
