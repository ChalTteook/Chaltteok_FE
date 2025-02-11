import * as React from "react";
import Svg, { Path } from "react-native-svg";
const LikeIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M19.6748 6.2002C21.2214 7.74684 21.2807 10.2356 19.8093 11.854L12.437 19.9629L5.06562 11.854C3.59429 10.2355 3.65355 7.74679 5.20019 6.20015C6.92711 4.47323 9.77122 4.63103 11.2969 6.53809L12.4375 7.96335L13.5771 6.53793C15.1028 4.63087 17.9479 4.47328 19.6748 6.2002Z"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default LikeIcon;
