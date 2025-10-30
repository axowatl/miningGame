/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;
/**
 * @type {WebGL2RenderingContext}
 */
const gl = canvas.getContext('webgl2');
