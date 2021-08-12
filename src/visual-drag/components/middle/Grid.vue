<template>
  <canvas id="canvas" width="1280" height="860"></canvas>
</template>

<script>
export default {
  mounted() {
    var myCanvas = document.querySelector("#canvas");
    var ctx = myCanvas.getContext("2d");

    /*
      1. 设置网格的大小，gridSize用于确定网格之中的线之间的间隔
      2. 获取Canvas的宽度width、高度height，用于计算x轴、y轴需要绘画的条数
      3. 采用遍历的方式，绘画x轴的线条
      4. 采用遍历的方式，绘画y轴的线条
    */

    // 1. 设置网格大小
    var girdSize = 20;

    // 2. 获取Canvas的width、height
    var CanvasWidth = ctx.canvas.width;
    var CanvasHeight = ctx.canvas.height;

    // 3. 采用遍历的方式，绘画x轴的线条
    var xLineTotals = Math.floor(CanvasHeight / girdSize); // 计算需要绘画的x轴条数
    for (var i = 0; i < xLineTotals; i++) {
      ctx.beginPath(); // 开启路径，设置不同的样式
      ctx.moveTo(0, girdSize * i - 0.5); // -0.5是为了解决像素模糊问题
      ctx.lineTo(CanvasWidth, girdSize * i - 0.5);
      if (xLineTotals - i === 7) {
        ctx.strokeStyle = "#409eff"; // 设置每个线条的颜色
      } else {
        ctx.strokeStyle = "#ccc"; // 设置每个线条的颜色
      }
      ctx.stroke();
    }

    // 4.采用遍历的方式，绘画y轴的线条
    var yLineTotals = Math.floor(CanvasWidth / girdSize) + 1; // 计算需要绘画y轴的条数
    for (var j = 0; j < yLineTotals; j++) {
      ctx.beginPath(); // 开启路径，设置不同的样式
      if (j === 0 || j == yLineTotals - 1) {
        ctx.moveTo(girdSize * j, 0);
        ctx.strokeStyle = "#409eff"; // 设置每个线条的颜色
        ctx.lineTo(girdSize * j, 720);
      } else {
        ctx.moveTo(girdSize * j, 0);
        ctx.strokeStyle = "#ccc"; // 设置每个线条的颜色
        ctx.lineTo(girdSize * j, CanvasHeight);
      }
      ctx.stroke();
    }
  },
};
</script>

<style scoped>
</style>