<template>
  <canvas id="webgl2" ref="canvas">Unsupporting WebGL</canvas>
</template>

<script setup>
const canvas = ref(null);
var vShaderSrc = `#version 300 es
    in vec2 a_position;
    uniform vec2 u_resolution;

    void main() {
        vec2 clipSpace = (a_position/u_resolution) * 2.0 - 1.0;
        gl_Position = vec4(clipSpace*vec2(1, -1), 0, 1);
    }
`;

var fShaderSrc = `#version 300 es
    precision highp float;

    uniform vec4 u_color;
    out vec4 outColor;

    void main() {
        outColor = u_color;
    }
`;

/**
 * 主函数
 */
function main() {
  const gl = canvas.getContext("webgl2");
  if (!gl) return;

  // 创建GLSL程序
  const program = createProgramWithShaderSrc(gl, [vShaderSrc, fShaderSrc]);
  const a_position = gl.getAttribLocation(program, "a_position");
  const u_color = gl.getUniformLocation(program, "u_color");
  const u_resolution = gl.getUniformLocation(program, "u_resolution");

  // 创建缓冲区
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  // 使能attribute属性
  gl.enableVertexAttribArray(a_position);
  // 设置attribute属性从缓冲区（当前的gl.ARRAY_BUFFER）中读取的方式
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

  // 观测画布对应的设备像素的变化
  const resizeObserver = new ResizeObserver((entries) => {
    onResize(entries);
    // console.log("set viewport: ", gl.canvas.width, gl.canvas.height);
    // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // requestAnimationFrame(() => drawScene(gl, u_color, u_resolution, program));
    drawScene(gl, u_color, u_resolution, program);
  });
  try {
    resizeObserver.observe(canvas, { box: "device-pixel-content-box" });
  } catch (ex) {
    console.log("device-pixel-content-box 不支持", ex);
    resizeObserver.observe(canvas, { box: "content-box" });
  }

  // requestAnimationFrame(() => drawScene(gl, u_color, u_resolution, program));
}

/**
 * 绘制矩形
 * @param {WebGL2RenderingContext} gl 绘图上下文
 * @param {Array} xy 顶点坐标：[x, y]
 * @param {Int} width 宽
 * @param {Int} height 长
 */
function setRectangle(gl, [x, y], width, height) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      x,
      y,
      x + width,
      y,
      x,
      y + height,
      x + width,
      y + height,
      x,
      y + height,
      x + width,
      y,
    ]),
    gl.STATIC_DRAW
  );
}

/**
 * 绘制
 */
function drawScene(gl, u_color, u_resolution, program) {
  // 指定区域及背景
  // resizeCanvasAndSetViewport(gl, gl.canvas); // 画布像素重置 & 设置视域大小
  console.log(gl, u_color, u_resolution, program);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 调用GLSL程序
  gl.useProgram(program);
  gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height);

  // 绘制50个矩形
  for (let i = 0; i < 66; i++) {
    gl.uniform4f(
      u_color,
      Math.random(),
      Math.random(),
      Math.random(),
      (Math.random() + 1) * 0.6
    ); // 设置矩形颜色
    setRectangle(
      gl,
      [Random.randomInt(gl.canvas.width), Random.randomInt(gl.canvas.height)],
      Random.randomInt(gl.canvas.width),
      Random.randomInt(gl.canvas.width)
    );
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}
main();
</script>

<style lang="scss" scoped></style>
