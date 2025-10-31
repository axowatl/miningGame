import { fetchTextFile, createShader, createProgram, loadTexture } from "./utility.js";

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

const vertCode = await fetchTextFile('./shaders/vertex/basicImage.vert');
const fragCode = await fetchTextFile('./shaders/fragment/basicImage.frag');
console.log('Vertex Shader:', vertCode);
console.log('Fragment Shader:', fragCode);

const vertShader = createShader(gl, vertCode, gl.VERTEX_SHADER);
const fragShader = createShader(gl, fragCode, gl.FRAGMENT_SHADER);

const program = createProgram(gl, vertShader, fragShader);
gl.useProgram(program);

const texture = loadTexture(gl, "./assets/dirt1.png");

// Create a Vertex Array Object (VAO)
const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

// Quad vertices (-1 to 1) and corresponding texture coordinates (0 to 1)
const vertices = new Float32Array([-1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]);
const texCoords = new Float32Array([0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]);

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

const texCoordBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

const texCoordAttributeLocation = gl.getAttribLocation(program, "a_texcoord");
gl.enableVertexAttribArray(texCoordAttributeLocation);
gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);

// Get uniform location for the image texture and assign it to texture unit 0
const imageUniformLocation = gl.getUniformLocation(program, "u_image");
gl.uniform1i(imageUniformLocation, 0);

// The render loop function
const render = () => {
    // Update the uniform for resolution (if it changes)
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    
    // Clear the canvas every frame
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Activate texture unit 0 and bind the loaded texture
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Bind the VAO and draw the full-screen quad
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    // Request the next frame
    requestAnimationFrame(render);
};

// Start the render loop
requestAnimationFrame(render);
