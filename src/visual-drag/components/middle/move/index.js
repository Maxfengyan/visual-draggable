export const handleMouseDownOnShape = (
  $event,
  type,
  defaultStyle,
  currentIndex,
  activeIndex,
) => {
  if (type === 0) {
    $event.preventDefault();
  }
  $event.stopPropagation();
  const startY = $event.clientY;
  const startX = $event.clientX;

  const startTop = Number(defaultStyle.top);
  const startLeft = Number(defaultStyle.left);

  const move = (moveEvent) => {
    const curX = moveEvent.clientX;
    const curY = moveEvent.clientY;
    /* 防止跑出画布以外，加上限制条件 */
    if (curX - startX + startLeft < 0) {
      defaultStyle.left = 0;
    }
    if (curX - startX + startLeft + defaultStyle.width > 1280) {
      defaultStyle.left = 1280 - defaultStyle.width;
    }
    if (
      curX - startX + startLeft >= 0 &&
      curX - startX + startLeft + defaultStyle.width <= 1280
    ) {
      defaultStyle.left = curX - startX + startLeft;
    }

    if (curY - startY + startTop < 0) {
      defaultStyle.top = 0;
    } else {
      defaultStyle.top = curY - startY + startTop;
    }

    // 预留标线和吸附功能
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};
