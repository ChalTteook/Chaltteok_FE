import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const NotificationIcon = ({ size = 24, color = "black", ...props }) => (
  <Svg
    width={size}
    height={(size * 22) / 18} // 비율 유지 (18:22)
    viewBox="0 0 18 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3.00073 18.006V9.00269C3.00073 5.68776 5.68801 3.00049 9.00293 3.00049V3.00049C12.3179 3.00049 15.0051 5.68776 15.0051 9.00269V18.006M3.00073 18.006H15.0051M3.00073 18.006H1M15.0051 18.006H17.0059"
      stroke={color}
      strokeWidth={2.00073}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.00293 21.0073L10.0029 21.0073"
      stroke={color}
      strokeWidth={2.00073}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx={9.00378}
      cy={2}
      r={1}
      stroke={color}
      strokeWidth={2.00073}
    />
  </Svg>
);

export default NotificationIcon;