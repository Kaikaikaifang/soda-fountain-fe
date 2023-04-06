<template>
  <canvas id="webgl2" ref="canvas">Unsupporting WebGL</canvas>
</template>

<script setup>
import {
  createProgramWithShaderSrc,
  onResize,
  Random,
  rectangleVec,
} from "@/utils/webgl2.js";

const canvas = ref(null);
var vShaderSrc = `#version 300 es
    in vec2 a_position;
    in vec4 a_color;

    uniform vec2 u_resolution;

    out vec4 v_color;

    void main() {
        vec2 clipSpace = (a_position/u_resolution) * 2.0 - 1.0;
        gl_Position = vec4(clipSpace*vec2(1, -1), 0, 1);
        v_color = a_color;
    }
`;

var fShaderSrc = `#version 300 es
    precision highp float;

    in vec4 v_color;

    out vec4 outColor;

    void main() {
        outColor = v_color;
    }
`;

/**
 * 主函数
 */
function main() {
  const gl = canvas.value.getContext("webgl2");
  if (!gl) return;

  // 创建GLSL程序
  const program = createProgramWithShaderSrc(gl, [vShaderSrc, fShaderSrc]);
  const a_position = gl.getAttribLocation(program, "a_position");
  const a_color = gl.getAttribLocation(program, "a_color");
  const u_resolution = gl.getUniformLocation(program, "u_resolution");

  var vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  // 创建缓冲区
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // 使能attribute属性
  gl.enableVertexAttribArray(a_position);
  // 设置attribute属性从缓冲区（当前的gl.ARRAY_BUFFER）中读取的方式
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

  const color_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  gl.enableVertexAttribArray(a_color);
  gl.vertexAttribPointer(a_color, 4, gl.UNSIGNED_BYTE, true, 0, 0);

  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  // 观测画布对应的设备像素的变化
  const resizeObserver = new ResizeObserver((entries) => {
    onResize(entries);
    // console.log("set viewport: ", gl.canvas.width, gl.canvas.height);
    // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // requestAnimationFrame(() => drawScene(gl, u_color, u_resolution, program));
    drawScene(gl, u_resolution, program, vao, buffer, color_buffer);
  });
  try {
    resizeObserver.observe(canvas.value, { box: "device-pixel-content-box" });
  } catch (ex) {
    console.log("device-pixel-content-box 不支持", ex);
    resizeObserver.observe(canvas.value, { box: "content-box" });
  }

  // requestAnimationFrame(() => drawScene(gl, u_color, u_resolution, program));
}

/** 设置颜色 */
function setColor(gl, buffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  let data = [];
  for (let i = 0; i < 6; i++) {
    data = data.concat([...Random.randomUint8Array(256, 3), 255]);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(data), gl.STATIC_DRAW);
}

/** 设置矩形 */
function setGeometry(gl, buffer, loc) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // 生成矩形的四个顶点
  let v = rectangleVec(loc, 50, 50);
  v = v.concat(v.slice(2, 6));
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(v), // 追加下三角的两个顶点
    gl.STATIC_DRAW
  );
}

/**
 * 绘制
 */
function drawScene(gl, u_resolution, program, vao, loc_buffer, color_buffer) {
  gl.bindVertexArray(vao);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 调用GLSL程序
  gl.useProgram(program);
  gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height);

  // 绘制50个矩形
  for (let i = 0; i < gl.canvas.width; i += 50) {
    for (let j = 0; j < gl.canvas.height; j += 50) {
      setColor(gl, color_buffer);
      setGeometry(gl, loc_buffer, [i, j]);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  }
}
onMounted(() => {
  main();
});
</script>

<style lang="scss" scoped></style>
