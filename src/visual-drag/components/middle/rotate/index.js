export const handleRotate = (defaultStyle, shape, $event) => {
  $event.preventDefault();
  $event.stopPropagation();

  // 初始坐标和角度
  const position = defaultStyle;
  const startY = $event.clientY;
  const startX = $event.clientX;
  const startRotate = position.rotate;

  // 获取元素中心点位置
  const rect = shape.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // 旋转前的角度
  const rotateDegreeBefore =
    Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180);

  const move = (mouseEvent) => {
    const curX = mouseEvent.clientX;
    const curY = mouseEvent.clientY;

    // 旋转后弧度
    const rotateDegreeAfter =
      Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180);

    // 旋转后角度
    let rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore;
    defaultStyle.rotate = rotate;
  };

  const up = (mouseEvent) => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};
