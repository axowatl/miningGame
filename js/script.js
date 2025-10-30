import { fetchTextFile, createShader, createProgram } from "./utility.js";

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");

/**
 * @type {WebGL2RenderingContext}
 */
const gl = canvas.getContext('webgl2');
if (!gl) {
    console.error("WebGL2 is not supported by your browser.");
}

// Function to handle resizing
const resizeCanvas = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
};

// Initial resize and add listener for future resizes
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const vertCode = await fetchTextFile('./shaders/vertex/basic.vert');
const fragCode = await fetchTextFile('./shaders/fragment/basic.frag');
console.log('Vertex Shader:', vertCode);
console.log('Fragment Shader:', fragCode);

const vertShader = createShader(gl, vertCode, gl.VERTEX_SHADER);
const fragShader = createShader(gl, fragCode, gl.FRAGMENT_SHADER);

const program = createProgram(gl, vertShader, fragShader);
gl.useProgram(program);

// Create a Vertex Array Object (VAO) to store our attribute configuration
const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

// A simple quad with 4 vertices that covers the entire clip space from -1 to 1.
// We will draw this as a triangle strip.
const vertices = new Float32Array([
    -1.0, -1.0,
    -1.0,  1.0,
     1.0, -1.0,
     1.0,  1.0
]);

// Create a buffer for the vertices
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Get the position attribute location and configure it
const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

// Get the uniform location for canvas size (useful for shaders)
const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

// Clear the canvas
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// Draw the scene
const draw = () => {
    // Update the uniform for resolution
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    
    // Bind the VAO and draw the full-screen quad
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

// Start the render loop
const render = () => {
    draw();
    requestAnimationFrame(render);
};
requestAnimationFrame(render);
