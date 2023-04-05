/**
 * 着色器实例生成函数
 * @param { WebGL2RenderingContext } gl 绘图上下文
 * @param { number } type 着色器类型 enu: [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER]
 * @param { string } source GLSL代码
 * @returns { shader } shader 着色器
 */
function createShader(gl, type, source) {
  let shader = gl.createShader(type); // 指定着色器类型，初始化着色器实例
  gl.shaderSource(shader, source); // 指定GLSL代码
  gl.compileShader(shader); // 编译代码
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader)); // 获取编译失败的信息
  gl.deleteShader(shader); // 删除着色器实例
}

/**
 * GLSL程序生成函数
 * @param { WebGL2RenderingContext } gl 绘图上下文
 * @param { VERTEX_SHADER } vertexShader 定点着色器
 * @param { FRAGMENT_SHADER } fragmentShader 片元着色器
 * @returns { program } program GLSL程序
 */
function createProgram(gl, vertexShader, fragmentShader) {
  let program = gl.createProgram(); // 初始化程序
  gl.attachShader(program, vertexShader); // 为GLSL程序指定着色器
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program); // 为绘图上下文指定GLSL程序
  const success = gl.getProgramParameter(program, gl.LINK_STATUS); // 查询上述步骤是否执行成功
  if (success) {
    return program; // 成功：返回GLSL程序
  }
  // 失败：1. 打印错误信息 2. 删除GLSL程序
  console.log(gl.getProgramInfoLog);
  gl.deleteProgram(program);
}

/**
 * 封装createShader&createProgram
 * @param {WebGL2RenderingContext} gl 绘图上下文
 * @param {Array} shadersSrc 顶点着色器&片元着色器的GLSL代码
 * @returns {program} GLSL程序
 */
function createProgramWithShaderSrc(gl, [vertexShaderSrc, fragmentShaderSrc]) {
  return createProgram(
    gl,
    createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc),
    createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc)
  );
}

/**
 * 画布像素重置（指定像素）
 * @param {HTMLCanvasElement} canvas
 * @param {Int} width
 * @param {Int} height
 * @returns {Boolean} need
 */
function resize(canvas, width, height) {
  let need = canvas.height !== height || canvas.width !== width;
  if (need) {
    canvas.height = height;
    canvas.width = width;
  }
  return need;
}

/**
 * 画布像素重置（与画布大小保持一致）
 * @param {HTMLCanvasElement} canvas 待重置的元素
 * @returns {Boolean} 是否需要重置
 */
function resizeCanvas(canvas) {
  return resize(canvas, canvas.clientWidth, canvas.clientHeight);
}

/**
 * 重置画布&设置视域（告诉webgl如何转换坐标）
 * @param {WebGL2RenderingContext} gl 绘图上下文
 * @param {HTMLCanvasElement} canvas 待重置的元素
 */
function resizeCanvasAndSetViewport(gl, canvas) {
  // if (resizeCanvas(canvas)) {
  if (resizeCanvasConsiderRatio(canvas)) {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); // 设置视域，告诉webgl将剪裁空间(-1, 1)转换至像素空间(0, width), (0, height)
  }
}

/**
 * 考虑缩放
 * @param {HTMLCanvasElement} canvas
 * @returns {Boolean} if need resize
 */
function resizeCanvasConsiderRatio(canvas) {
  const dpr = window.devicePixelRatio;
  const { width, height } = canvas.getBoundingClientRect();
  const displayWidth = Math.round(width * dpr);
  const displayHeight = Math.round(height * dpr);
  return resize(canvas, displayWidth, displayHeight);
}

/**
 * 缩放回调函数
 * @param {ResizeObserverEntry} entries 所有在观测元素的相关信息
 */
function onResize(entries) {
  entries.forEach((entry) => {
    let displayHeight;
    let displayWidth;
    let dpr = window.devicePixelRatio;
    if ("devicePixelContentBoxSize" in entry) {
      // entry中含设备像素的信息，只有这个是最准确的实现！
      displayHeight = entry.devicePixelContentBoxSize[0].blockSize;
      displayWidth = entry.devicePixelContentBoxSize[0].inlineSize;
    } else if ("contentBoxSize" in entry) {
      // 不含设备像素的信息，含有CSS像素的信息
      displayHeight = Math.round(entry.contentBoxSize[0].blockSize * dpr);
      displayWidth = Math.round(entry.contentBoxSize[0].inlineSize * dpr);
    } else {
      // 浏览器以上两种信息都不支持
      // contentRect为历史遗留，兼容性好，以后可能启用！
      displayHeight = Math.round(entry.contentRect.height * dpr);
      displayWidth = Math.round(entry.contentRect.width * dpr);
    }
    resize(entry.target, displayWidth, displayHeight);
  });
}

/**随机数生成 */
class Random {
  constructor() {}
  /**
   * 随机正整数生成器
   * @param {Int} range 范围 [0, range)
   * @returns {Int}
   */
  static randomInt(range) {
    return Math.floor(Math.random() * range);
  }

  /**
   * 随机数数组生成器
   * @param {Int} range - 范围 [0, range)
   * @param {Int} num - 个数
   * @returns {Uint8Array}
   */
  static randomUint8Array(range, num) {
    let res = [];
    for (let i = 0; i < num; i++) {
      res.push(this.randomInt(range));
    }
    return res;
  }
}

/**
 * 矩形四顶点生成器
 * @param {Array} v2LT - 左上角顶点坐标
 * @param {Int} width - 宽
 * @param {Int} height - 长
 * @returns {Array} [左上，右上， 左下， 右下]
 */
function rectangleVec(v2LT, width, height) {
  return [
    ...v2LT,
    v2LT[0] + width,
    v2LT[1],
    v2LT[0],
    v2LT[1] + height,
    v2LT[0] + width,
    v2LT[1] + height,
  ];
}
