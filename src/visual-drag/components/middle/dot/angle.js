import { mod360 } from "./translate";
// 每个范围的角度对应的光标
const angleToCursor = [
  { start: 338, end: 23, cursor: "nw" },
  { start: 23, end: 68, cursor: "n" },
  { start: 68, end: 113, cursor: "ne" },
  { start: 113, end: 158, cursor: "e" },
  { start: 158, end: 203, cursor: "se" },
  { start: 203, end: 248, cursor: "s" },
  { start: 248, end: 293, cursor: "sw" },
  { start: 293, end: 338, cursor: "w" },
];

// 每个点对应的初始角度
const initialAngle = {
  lt: 0,
  t: 45,
  rt: 90,
  r: 135,
  rb: 180,
  b: 225,
  lb: 270,
  l: 315,
};

// 动态计算八个小圆点的值
export const getPointStyle = (point, defaultStyle) => {
  const { width, height } = defaultStyle;
  const hasT = /t/.test(point);
  const hasB = /b/.test(point);
  const hasL = /l/.test(point);
  const hasR = /r/.test(point);
  let newLeft = 0;
  let newTop = 0;

  // 四个角的圆点
  if (point.length === 2) {
    newLeft = hasL ? 0 : width;
    newTop = hasT ? 0 : height;
  } else {
    // 上下两点的点，宽度居中
    if (hasT || hasB) {
      newLeft = width / 2;
      newTop = hasT ? 0 : height;
    }

    // 左右两边的点，高度居中
    if (hasL || hasR) {
      newLeft = hasL ? 0 : width;
      newTop = Math.floor(height / 2);
    }
  }

  const style = {
    marginLeft: "-4px",
    marginTop: "-4px",
    left: newLeft + "px",
    top: newTop + "px",
    // cursor: getCursor(state.pointList, defaultStyle)[point],
    cursor: getCursor(point, defaultStyle),
  };

  return style;
};

// 计算光标形状
export const getCursor = (point, curComponentStyle) => {
  const rotate = mod360(curComponentStyle.rotate); // 取余360；
  let result = "";

  const angle = mod360(initialAngle[point] + rotate);

  angleToCursor.forEach((angleLimit) => {
    if (angle < 23 || angle > 338) {
      result = "nw-resize"; // 左上箭头
    }
    if (angleLimit.start <= angle && angle < angleLimit.end) {
      result = angleLimit.cursor + "-resize";
    }
  });

  return result;
};
