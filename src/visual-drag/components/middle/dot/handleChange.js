import calculateComponentPositonAndSize from "./calculateComponentPositonAndSize";
export const handleMouseDownPoint = (
  defaultStyle,
  shape,
  point,
  $event,
  state,
) => {
  $event.stopPropagation();
  $event.preventDefault();

  // 组件宽高比
  const proportion = defaultStyle.width / defaultStyle.height;

  // 组件中心点
  const center = {
    x: defaultStyle.left + defaultStyle.width / 2,
    y: defaultStyle.top + defaultStyle.height / 2,
  };

  // 获取画布信息
  const contentCanvas = document
    .querySelector(".editor")
    .getBoundingClientRect();
  // 获取 point 与实际拖动基准点的差值
  const pointRect = $event.target.getBoundingClientRect();

  // 当前点击圆点相对于画布的中心坐标
  const curPoint = {
    x: Math.round(
      pointRect.left -
        contentCanvas.left +
        $event.target.offsetWidth / 2,
    ),
    y: Math.round(
      pointRect.top -
        contentCanvas.top +
        $event.target.offsetHeight / 2,
    ),
  };

  // 获取对称焦点
  const symmetricPoint = {
    x: center.x - (curPoint.x - center.x),
    y: center.y - (curPoint.y - center.y),
  };

  let isFirst = true;
  const move = (moveEvent) => {
    // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
    // 因此第一次点击时不触发 move 事件
    if (isFirst) {
      isFirst = false;
      return;
    }

    const curPosition = {
      x: moveEvent.clientX - contentCanvas.left,
      y: moveEvent.clientY - contentCanvas.top,
    };

    calculateComponentPositonAndSize(
      point,
      defaultStyle,
      curPosition,
      proportion,
      false,
      {
        center,
        curPoint,
        symmetricPoint,
      },
    );
  };
  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};
