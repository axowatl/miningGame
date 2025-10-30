export async function fetchTextFile(filePath) {
	try {
		const response = await fetch(filePath);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const textContent = await response.text();
		return textContent;
	} catch (error) {
		console.error('Fetch error:', error);
	}
}

/**
 * Compiles a shader
 * @param {WebGL2RenderingContext} gl 
 * @param {string} source 
 * @param {number} type gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
 * @returns 
 */
export function createShader(gl, source, type) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	return shader;
}

/**
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLShader} vertexShaderSource 
 * @param {WebGLShader} fragmentShaderSource 
 * @returns 
 */
export function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
	var program = gl.createProgram();
	var vshader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
	var fshader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
	gl.attachShader(program, vshader);
	gl.deleteShader(vshader);
	gl.attachShader(program, fshader);
	gl.deleteShader(fshader);
	gl.linkProgram(program);

	var log = gl.getProgramInfoLog(program);
	if (log) {
		console.log(log);
	}

	log = gl.getShaderInfoLog(vshader);
	if (log) {
		console.log(log);
	}

	log = gl.getShaderInfoLog(fshader);
	if (log) {
		console.log(log);
	}

	return program;
};
