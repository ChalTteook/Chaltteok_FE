import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_96_207)">
      <Path
        d="M19.6748 6.2002C21.2214 7.74684 21.2807 10.2356 19.8093 11.854L12.437 19.9629L5.06562 11.854C3.59429 10.2355 3.65355 7.74679 5.20019 6.20015C6.92711 4.47323 9.77122 4.63103 11.2969 6.53809L12.4375 7.96335L13.5771 6.53793C15.1028 4.63087 17.9479 4.47328 19.6748 6.2002Z"
        fill="#F71D6A"
        stroke="#F71D6A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_96_207">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SVGComponent;
