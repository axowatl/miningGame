#version 300 es
precision highp float;
// Receive interpolated texture coordinates from the vertex shader
in vec2 v_texcoord;
// A uniform to hold the image texture
uniform sampler2D u_image;
out vec4 outColor;

void main() {
    // Sample the color from the texture at the given coordinates
    outColor = texture(u_image, v_texcoord);
}
