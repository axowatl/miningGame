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
export function createProgram(gl, vshader, fshader) {
	var program = gl.createProgram();
	// var vshader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
	// var fshader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
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

// In utility.js (assuming you have a function like this)
export function loadTexture(gl, url) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Fill the texture with a 1x1 blue pixel while waiting for the image to load
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

    const image = new Image();
    image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        // **Add these lines to use nearest neighbor filtering for sharp pixels**
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        
        // Prevents blurring if the texture dimensions are not powers of 2
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        
        // If your textures are powers of 2, you could use mipmaps instead:
        // gl.generateMipmap(gl.TEXTURE_2D);
    };
    image.src = url;

    return texture;
}
